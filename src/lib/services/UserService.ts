import UserRepository from '@/lib/repositories/UserRepository';
import Serializer from '@/lib/services/Serializer';
import User from '@/lib/models/users/User';
import { inject, singleton } from 'tsyringe';

@singleton()
class UserService {
    constructor(
        @inject(UserRepository) private repository: UserRepository,
        @inject(Serializer) private serializer: Serializer,
    ) {
        if (!repository || !serializer) {
            throw new Error(
                `Could not resolve repository or serializer: ${repository} ${serializer}`,
            );
        }
    }

    public async getAllUsers(): Promise<Array<User>> {
        const data = await this.repository.getAll();
        return data;
    }
}

export default UserService;
