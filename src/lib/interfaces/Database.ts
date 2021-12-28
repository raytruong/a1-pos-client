interface Database {
    name: string;

    setup(name?: string): void;

    connect(): void;

    getConnection(): any;
}

export default Database;
