"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortcuts_1 = require("../helpers/shortcuts");
const connection_1 = require("../database/connection");
const Note_1 = require("../entities/Note");
module.exports = {
    name: 'notes',
    actions: {
        async getAll(ctx) {
            try {
                const noteRepository = connection_1.AppDataSource.getRepository(Note_1.Note);
                const notes = await noteRepository.find({
                    select: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
                });
                return {
                    success: true,
                    data: notes,
                    count: notes.length,
                };
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to fetch notes',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
        async getOne(ctx) {
            try {
                const id = ctx.params.id;
                if (Number.isNaN(Number(id))) {
                    (0, shortcuts_1.setError)(ctx, 500);
                    return {
                        success: false,
                        error: "Invalid input: 'notes id' must be numeric",
                    };
                }
                const noteRepository = connection_1.AppDataSource.getRepository(Note_1.Note);
                const note = await noteRepository.findOneBy({ id });
                return {
                    success: true,
                    data: note,
                };
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to fetch notes',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
        async insert(ctx) {
            try {
                const length = Object.keys(ctx.params).length;
                const notes = Array.from({ ...ctx.params, length });
                if (!notes?.length) {
                    (0, shortcuts_1.setError)(ctx, 400);
                    return {
                        success: false,
                        error: "Invalid input: 'notes' must be an array",
                    };
                }
                if (notes.length === 0) {
                    (0, shortcuts_1.setError)(ctx, 400);
                    return {
                        success: false,
                        error: "Invalid input: 'notes' array cannot be empty",
                    };
                }
                for (const note of notes) {
                    if (!note.title) {
                        (0, shortcuts_1.setError)(ctx, 400);
                        return {
                            success: false,
                            error: 'Invalid input: each note must have name and email',
                        };
                    }
                }
                const noteRepository = connection_1.AppDataSource.getRepository(Note_1.Note);
                const savedNotes = await noteRepository.save(notes);
                return {
                    success: true,
                    message: `Successfully created ${savedNotes.length} notes`,
                    data: savedNotes.map((note) => ({
                        id: note.id,
                        name: note.title,
                        email: note.content,
                    })),
                };
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to create notes',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
        async update(ctx) {
            try {
                const { id, title, content } = ctx.params;
                const noteRepository = connection_1.AppDataSource.getRepository(Note_1.Note);
                const note = await noteRepository.findOneBy({ id });
                if (!note) {
                    (0, shortcuts_1.setError)(ctx, 404);
                    return {
                        success: false,
                        error: `Note with id ${id} not found`,
                    };
                }
                note.title = title;
                note.content = content;
                note.updatedAt = new Date();
                await noteRepository.update(note.id, note);
                return note;
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to create notes',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
        async delete(ctx) {
            try {
                const idFrom = ctx.params.id;
                const id = Number(idFrom);
                if (Number.isNaN(id)) {
                    (0, shortcuts_1.setError)(ctx, 500);
                    return {
                        success: false,
                        error: "Invalid input: 'note id' must be numeric",
                    };
                }
                const noteRepository = connection_1.AppDataSource.getRepository(Note_1.Note);
                const note = await noteRepository.findOneBy({ id });
                if (!note) {
                    (0, shortcuts_1.setError)(ctx, 404);
                    return {
                        success: false,
                        error: `Note with id ${id} not found`,
                    };
                }
                await noteRepository.remove(note);
                return { message: `Note with id ${id} deleted` };
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to create notes',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
    },
    started() {
        console.log('Note Service started');
    },
};
