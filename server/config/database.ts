import 'module-alias/register';
import knex from 'knex';
import type { Knex } from 'knex';
import { Logger } from '@/server/utils/logger';

const config: Knex.Config = {
    acquireConnectionTimeout: 10000,
    client: 'sqlite3',
    connection: {
        filename: '../../database.sqlite'
    },
    migrations: {
        directory: '../database/migrations',
        extension: 'ts',
        tableName: 'migrations'
    },
    pool: {
        max: 100,
        min: 0
    },
    seeds: {
        directory: '../database/seeds',
        extension: 'ts'
    }
};

class Database {
    // eslint-disable-next-line no-use-before-define
    private static instance: Database;
    private readonly connection: Knex;

    private constructor() {
        this.connection = knex(config);
        this.connection.raw('SET search_path TO public');
        Logger.info('Database connection established', 'database.ts');
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getConnection(): Knex {
        return this.connection;
    }
}

export const db: Knex = Database.getInstance().getConnection();
export default config;
