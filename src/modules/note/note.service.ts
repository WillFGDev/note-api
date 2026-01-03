import Note from "./note.model";
import { ICreateNote, IUpdateNote } from "./note.interface";
import UserNote from "../../database/relations/userNote.model";
import User from "../user/user.model";

const noteService = {
    getAllNotes: async (ownerId: number) => {
        const notes = await Note.findAll({where: { ownerId }});
        return notes;
    },

    getAllShareNotes: async (userId: number) => {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Note,
                    through: { attributes: [] }
                }
            ]
        });

        return user?.notes ?? [];
    },

    getNoteById: async (id: number) => {
        const note = await Note.findByPk(id);
        if (!note) return null;
        return note;
    },

    createNote: async (noteData: ICreateNote) => {
        const note = await Note.create(noteData);
        return note;
    },

    updateNote: async (id: number, noteData: IUpdateNote) => {
        const note = await Note.findByPk(id);
        if (!note) return null;
        const oldNote = { ...note.get() };
        const updatedNote = await note.update(noteData);
        return { before: oldNote, after: updatedNote };
    },

    deleteNote: async (id: number) => {
        const note = await Note.findByPk(id);
        if (!note) return null;
        await note.destroy();
        return note;
    },

    shareNote: async (id: number, usersId: number[]) => {
        if(!usersId.length) return null;
        const relations = usersId.map(userId => ({user: userId, note: id}));
        return await UserNote.bulkCreate(relations, { ignoreDuplicates: true });    
    },

    isShared: async (user: number, note: number) => {
        return await UserNote.findOne({where: { user, note }});
    }
};

export default noteService;