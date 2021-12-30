import Cloneable from '@/lib/interfaces/Cloneable';
import { Expose } from 'class-transformer';

class User implements Cloneable<User> {
    constructor(_id: string, _rev: string, pin: string, name: string) {
        this.__id = _id;
        this.__rev = _rev;
        this._pin = pin;
        this._name = name;
    }

    @Expose({ name: '_id' })
    private __id: string;

    public get _id(): string {
        return this.__id;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }

    @Expose({ name: '_rev' })
    private __rev: string;

    public get _rev(): string {
        return this.__rev;
    }

    public set _rev(rev: string) {
        this.__rev = rev;
    }

    @Expose({ name: 'pin' })
    private _pin: string;

    public get pin(): string {
        return this._pin;
    }

    public set pin(pin: string) {
        this._pin = pin;
    }

    @Expose({ name: 'name' })
    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public clone(name: string, pin: string): User {
        return new User(`user:${Date.now()}`, '', pin, name);
    }
}

export default User;
