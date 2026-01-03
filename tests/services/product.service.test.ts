import noteService from "../../src/modules/note/note.service";
import Note from "../../src/modules/note/note.model";

jest.mock("../../src/modules/note/note.model", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
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
});
