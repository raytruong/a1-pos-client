import { singleton } from 'tsyringe';
import Serializable from '@/lib/models/interfaces/Serializable';

@singleton()
class Serializer {
    public deserialize<T extends Serializable>(
        serialized: string,
        type: { new (...args: any[]): T },
    ): T {
        const deserialized = Object.assign(new type(), JSON.parse(serialized));
        return deserialized;
    }

    public serialize<T extends Serializable>(
        obj: T,
        removeRev?: boolean,
    ): Record<string, unknown> {
        const serialized: string = JSON.stringify(obj, (key, val) => {
            if (removeRev === true && key === '_rev') return undefined;
            return val;
        });
        return JSON.parse(serialized);
    }
}

export default Serializer;
