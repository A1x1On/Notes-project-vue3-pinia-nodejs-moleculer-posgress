"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSampleNotes1762763267346 = void 0;
const typeorm_1 = require("typeorm");
const Note_1 = require("../entities/Note");
class AddSampleNotes1762763267346 {
    async up(queryRunner) {
        const tableExists = await queryRunner.hasTable('notes');
        if (tableExists)
            return;
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'notes',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'content',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: true,
                    default: null,
                },
            ],
        }));
        await queryRunner.manager.getRepository(Note_1.Note).insert([
            {
                title: 'Новая заметка',
                content: 'оТекст тктетвст тктскт',
                updatedAt: null,
            },
            {
                title: 'Записка прост',
                content: 'много контента тут',
                updatedAt: null,
            },
        ]);
    }
    async down(queryRunner) {
        await queryRunner.manager
            .getRepository(Note_1.Note)
            .delete({ title: 'Новая заметка' });
        await queryRunner.manager
            .getRepository(Note_1.Note)
            .delete({ title: 'Записка прост' });
    }
}
exports.AddSampleNotes1762763267346 = AddSampleNotes1762763267346;
