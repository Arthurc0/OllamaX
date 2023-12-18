import type { UserEntity } from '@/server/entities/UserEntity';
import { AbstractRepository } from '@/server/repositories/AbstractRepository';

export class UserRepository extends AbstractRepository<UserEntity> {
    public constructor() {
        super('users');
    }
}
