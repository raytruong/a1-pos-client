import { singleton } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import User from '@/lib/models/User';

@singleton()
class UserSerializer {
    public deserialize(serialized: Record<string, unknown>): User {
        return plainToClass(User, serialized);
    }
}

export default UserSerializer;
