import Cloneable from '@/lib/models/interfaces/Cloneable';
import Serializable from '@/lib/models/interfaces/Serializable';

class User implements Cloneable<User>, Serializable {
    constructor(_id: string, _rev: string, pin: string, name: string) {
        this.__id = _id ? _id : `user:${Date.now()}`;
        this.__rev = _rev;
        this._pin = pin;
        this._name = name;
    }

    private __id: string;

    public get _id(): string {
        return this.__id;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }

    private __rev: string;

    public get _rev(): string {
        return this.__rev;
    }

    private _pin: string;

    public get pin(): string {
        return this._pin;
    }

    public set pin(pin: string) {
        this._pin = pin;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public clone(name?: string, pin?: string): User {
        if (!name || !pin) {
            throw new Error(
                `Expected name and pin, actual: name: ${name}, pin: ${pin}`,
            );
        }
        return new User(`user:${Date.now()}`, '', pin, name);
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
