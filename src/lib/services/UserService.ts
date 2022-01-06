import UserRepository from '@/lib/repositories/UserRepository';
import User from '@/lib/models/User';
import { inject, singleton } from 'tsyringe';

@singleton()
class UserService {
    constructor(@inject(UserRepository) private repository: UserRepository) {
        if (!repository) {
            throw new Error(`Could not resolve repository: ${repository}`);
        }
    }

    public async get(_id: string): Promise<User> {
        const data = await this.repository.get(_id);
        return data;
    }

    public async getAllUsers(): Promise<Array<User>> {
        const data = await this.repository.getAll();
        return data;
    }
}

export default UserService;
