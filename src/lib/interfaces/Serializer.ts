interface Serializer<T> {
    deserialize(serialized: Record<string, unknown>): T;

    deserializeAll(serialized: Array<Record<string, unknown>>): Array<T>;

    serialize(deserialized: T): Record<string, unknown>;

    serializeAll(deserialized: Array<T>): Array<Record<string, unknown>>;
}

export default Serializer;
