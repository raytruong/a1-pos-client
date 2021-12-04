import Buildable from '@/lib/models/interfaces/Buildable';
import Serializable from '@/lib/models/interfaces/Serializable';

class User implements Buildable<User>, Serializable {
    private __id: string;
    private __rev: string;
    private _pin: string;
    private _name: string;

    constructor(_id: string, _rev: string, pin: string, name: string) {
        this.__id = _id;
        this.__rev = _rev;
        this._pin = pin;
        this._name = name;
    }

    public get _id(): string {
        return this.__id;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }

    public get _rev(): string {
        return this.__rev;
    }

    public get pin(): string {
        return this._pin;
    }

    public set pin(pin: string) {
        this._pin = pin;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public build(name?: string, pin?: string): User {
        if (!name || !pin) {
            throw new Error(
                `User.build(): Expected name and pin, actual: name: ${name}, pin: ${pin}`,
            );
        }
        return this.constructor(`user:${Date.now()}`, '', pin, name);
    }

    public toJSON(): object {
        return {
            _id: this._id,
            _rev: this._rev,
            _pin: this.pin,
            _name: this.name,
        };
    }
}

export default User;
