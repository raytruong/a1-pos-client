interface Database {
    connect(
        name: string,
        username: string,
        password: string,
        baseUrl: string,
    ): void;

    getConnection(): any;
}

export default Database;
