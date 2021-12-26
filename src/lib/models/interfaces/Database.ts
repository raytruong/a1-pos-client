interface Database {
    connect(): void;

    getConnection(): any;
}

export default Database;
