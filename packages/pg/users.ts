import Knex from 'knex';
import knexConfig from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const knexInstance = Knex(knexConfig[environment]);

interface User {
    id: number;
    username: string;
    password: string;
}

export const getAllUsers = (): Promise<User[]> => {
    try {
        return knexInstance('users').select('*');
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error}`);
    }
};

export const getUserById = (id: number): Promise<User | undefined> => {
    try {
        return knexInstance('users').where('id', id).first();
    } catch (error) {
        throw new Error(`Failed to fetch user by ID: ${error}`);
    }
};

export const createUser = (user: User): Promise<User[]> => {
    try {
        return knexInstance('users').insert(user).returning('*');
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
};

export const updateUser = (id: number, updatedUser: Partial<User>): Promise<User[]> => {
    try {
        return knexInstance('users').where('id', id).update(updatedUser).returning('*');
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
};

export const deleteUser = (id: number): Promise<number> => {
    try {
        return knexInstance('users').where('id', id).del();
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
};