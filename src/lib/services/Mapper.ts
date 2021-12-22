// import { autoInjectable, singleton } from 'tsyringe';
// import Serializable from '@/lib/models/interfaces/Serializable';

// @autoInjectable()
// @singleton()
// class SerializerService {
//     public serialize<T extends Serializable>(
//         obj: T,
//         removeRev?: boolean,
//     ): string {
//         const serialized: string = JSON.stringify(obj, (key, val) => {
//             if (removeRev === true && key === '_rev') return undefined;
//             return val;
//         });
//         return serialized;
//     }
//     public deserialize<T extends Serializable>(
//         serialized: string,
//         type: { new (...args: any[]): T },
//     ): T {
//         // TODO: test this
//         return new type(JSON.parse(serialized));
//     }
// }

// export default SerializerService;
