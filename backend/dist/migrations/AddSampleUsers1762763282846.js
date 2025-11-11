"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSampleUsers1762763282846 = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class AddSampleUsers1762763282846 {
    async up(queryRunner) {
        const tableExists = await queryRunner.hasTable('users');
        if (tableExists)
            return;
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
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
        await queryRunner.manager.getRepository(User_1.User).insert([
            { name: 'Doe2', email: 'john.doe@example.com', updatedAt: null },
            { name: 'Smith2', email: 'jane.smith@example.com', updatedAt: null },
            { name: 'Johnson2', email: 'bob.johnson@example.com', updatedAt: null },
        ]);
    }
    async down(queryRunner) {
        await queryRunner.manager
            .getRepository(User_1.User)
            .delete({ email: 'john.doe@example.com' });
        await queryRunner.manager
            .getRepository(User_1.User)
            .delete({ email: 'jane.smith@example.com' });
        await queryRunner.manager
            .getRepository(User_1.User)
            .delete({ email: 'bob.johnson@example.com' });
    }
}
exports.AddSampleUsers1762763282846 = AddSampleUsers1762763282846;
