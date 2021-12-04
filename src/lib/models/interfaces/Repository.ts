interface Repository<T> {
    get(_id: string): Promise<T>;
    getAll(): Promise<Array<T>>;
    save(obj: T): void;
    update(obj: T): void;
    delete(obj: T): void;
}

export default Repository;
