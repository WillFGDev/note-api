import noteService from "../../src/modules/note/note.service";
import Note from "../../src/modules/note/note.model";
import UserNote from "../../src/database/relations/userNote.model";

jest.mock("../../src/modules/note/note.model", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../../src/modules/userNote/userNote.model", () => ({
  bulkCreate: jest.fn(),
  findOne: jest.fn(),
}));

describe("noteService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllNotes", () => {
    it("debe devolver todas las notas", async () => {
      const mockNotes = [{ id: 1, title: "Test", content: "Test" }];
      (Note.findAll as jest.Mock).mockResolvedValue(mockNotes);

      const result = await noteService.getAllNotes(1);

      expect(Note.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockNotes);
    });
  });

  describe("getAllNotes", () => {
    it("debe devolver todas las notas compartidas", async () => {
      const mockNotes = [{ id: 1, title: "Test", content: "Test" }];
      (Note.findAll as jest.Mock).mockResolvedValue(mockNotes);

      const result = await noteService.getAllShareNotes(1);

      expect(Note.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockNotes);
    });
  });

  describe("getNoteById", () => {
    it("debe devolver la nota si existe", async () => {
      const mockNote = { id: 1, title: "Test", content: "Test" };
      (Note.findByPk as jest.Mock).mockResolvedValue(mockNote);

      const result = await noteService.getNoteById(1);

      expect(Note.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockNote);
    });

    it("debe devolver null si no existe", async () => {
      (Note.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await noteService.getNoteById(999);

      expect(Note.findByPk).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe("createNote", () => {
    it("debe crear una nota", async () => {
      const noteData = { title: "New Note", content: "Test", ownerId: 1 };
      const createdNote = { id: 1, ...noteData };

      (Note.create as jest.Mock).mockResolvedValue(createdNote);

      const result = await noteService.createNote(noteData);

      expect(Note.create).toHaveBeenCalledWith(noteData);
      expect(result).toEqual(createdNote);
    });
  });

  describe("updateNote", () => {
    it("debe actualizar un producto existente", async () => {
      const oldNote = { id: 1, title: "Old", update: jest.fn() };
      const updatedData = { title: "Updated" };
      const updatedNote = { id: 1, title: "Updated" };

      (Note.findByPk as jest.Mock).mockResolvedValue(oldNote);
      (oldNote.update as jest.Mock).mockResolvedValue(updatedNote);

      const result = await noteService.updateNote(1, updatedData);

      expect(Note.findByPk).toHaveBeenCalledWith(1);
      expect(oldNote.update).toHaveBeenCalledWith(updatedData);
      expect(result).toEqual({ before: oldNote, after: updatedNote });
    });

    it("debe devolver null si la nota no existe", async () => {
      (Note.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await noteService.updateNote(999, { title: "Fail" });

      expect(Note.findByPk).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe("deleteNote", () => {
    it("debe eliminar una nota existente", async () => {
      const mockNote = { id: 1, destroy: jest.fn() };

      (Note.findByPk as jest.Mock).mockResolvedValue(mockNote);

      const result = await noteService.deleteNote(1);

      expect(Note.findByPk).toHaveBeenCalledWith(1);
      expect(mockNote.destroy).toHaveBeenCalled();
      expect(result).toEqual(mockNote);
    });

    it("debe devolver null si la nota no existe", async () => {
      (Note.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await noteService.deleteNote(999);

      expect(Note.findByPk).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe("shareNote", () => {
    it("debe retornar null si no se envían usuarios", async () => {
      const result = await noteService.shareNote(1, []);

      expect(result).toBeNull();
      expect(UserNote.bulkCreate).not.toHaveBeenCalled();
    });

    it("debe crear relaciones correctamente", async () => {
      const mockRelations = [{ user: 2, note: 1 }];

      (UserNote.bulkCreate as jest.Mock).mockResolvedValue(mockRelations);

      const result = await noteService.shareNote(1, [2]);

      expect(UserNote.bulkCreate).toHaveBeenCalledWith(
        [{ user: 2, note: 1 }],
        { ignoreDuplicates: true }
      );
      expect(result).toEqual(mockRelations);
    });

    it("debe crear múltiples relaciones", async () => {
      const usersId = [2, 3, 4];
      const expectedRelations = usersId.map(user => ({
        user,
        note: 1
      }));

      (UserNote.bulkCreate as jest.Mock).mockResolvedValue(expectedRelations);

      const result = await noteService.shareNote(1, usersId);

      expect(UserNote.bulkCreate).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedRelations);
    });
  });

  describe("isShared", () => {
    it("debe devolver la relación si existe", async () => {
      const mockRelation = { user: 1, note: 2 };

      (UserNote.findOne as jest.Mock).mockResolvedValue(mockRelation);

      const result = await noteService.isShared(1, 2);

      expect(UserNote.findOne).toHaveBeenCalledWith({
        where: { user: 1, note: 2 }
      });
      expect(result).toEqual(mockRelation);
    });

    it("debe devolver null si no existe la relación", async () => {
      (UserNote.findOne as jest.Mock).mockResolvedValue(null);

      const result = await noteService.isShared(1, 2);

      expect(UserNote.findOne).toHaveBeenCalledWith({
        where: { user: 1, note: 2 }
      });
      expect(result).toBeNull();
    });
  });
});
