import { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';
import { StatusCodeEnum } from '@/enums/StatusCodeEnum';
import { RequestError } from '@/classes/RequestError';
import { db } from '@/server/database/db-config';

export abstract class AbstractRepository<T> {
    protected tableName: string;

    public constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async create(entity: Partial<T>): Promise<T> {
        return (await db.insert(entity).into(this.tableName).returning('*'))[0] as T;
    }

    public async getAll(toSelect: (keyof T)[] = [], whereEquals: Partial<T> = {}): Promise<Partial<T>[]> {
        return await db.select(toSelect.length ? toSelect : '*').from(this.tableName).where(whereEquals);
    }

    public async getOne(whereEquals: Partial<T>): Promise<T> {
        return await db.select().from(this.tableName).where(whereEquals).first() as T;
    }

    public async update(entity: Partial<T>, whereEquals: Partial<T>): Promise<T> {
        const res = await db(this.tableName)
            .update(entity)
            .where(whereEquals)
            .returning('*');
        if (!res.length) throw new RequestError(ErrorCodeEnum.NOT_UPDATED, StatusCodeEnum.BAD_REQUEST);
        return res[0];
    }

    public async delete(whereEquals: Partial<T>): Promise<void> {
        if (await db.delete().from(this.tableName).where(whereEquals) === 0) throw new RequestError(ErrorCodeEnum.NOT_DELETED, StatusCodeEnum.BAD_REQUEST);
    }
}
