"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortcuts_1 = require("../helpers/shortcuts");
const connection_1 = require("../database/connection");
const User_1 = require("../entities/User");
module.exports = {
    name: 'users',
    actions: {
        async getUsers(ctx) {
            try {
                const userRepository = connection_1.AppDataSource.getRepository(User_1.User);
                const users = await userRepository.find({
                    select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
                });
                return {
                    success: true,
                    data: users,
                    count: users.length,
                };
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to fetch users',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
        async createUsers(ctx) {
            try {
                const length = Object.keys(ctx.params).length;
                const users = Array.from({ ...ctx.params, length });
                if (!users?.length) {
                    (0, shortcuts_1.setError)(ctx, 400);
                    return {
                        success: false,
                        error: "Invalid input: 'users' must be an array",
                    };
                }
                if (users.length === 0) {
                    (0, shortcuts_1.setError)(ctx, 400);
                    return {
                        success: false,
                        error: "Invalid input: 'users' array cannot be empty",
                    };
                }
                for (const user of users) {
                    if (!user.name || !user.email) {
                        (0, shortcuts_1.setError)(ctx, 400);
                        return {
                            error: 'Invalid input: each user must have name and email',
                        };
                    }
                }
                const userRepository = connection_1.AppDataSource.getRepository(User_1.User);
                const savedUsers = await userRepository.save(users);
                return {
                    success: true,
                    message: `Successfully created ${savedUsers.length} users`,
                    data: savedUsers.map((user) => ({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    })),
                };
            }
            catch (error) {
                (0, shortcuts_1.setError)(ctx, 500);
                return {
                    success: false,
                    error: 'Failed to create users',
                    details: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        },
    },
    started() {
        console.log('User Service started');
    },
};
