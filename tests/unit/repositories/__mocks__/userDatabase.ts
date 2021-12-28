export const user1 = {
    __id: 'id1',
    __rev: 'rev1',
    _pin: 'pin1',
    _name: 'name1',
};

export const user2 = {
    __id: 'id2',
    __rev: 'rev2',
    _pin: 'pin2',
    _name: 'name2',
};

const mockDB = {
    get: jest.fn().mockImplementation((_id) => {
        return _id === 'id1' ? user1 : user2;
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return { rows: [user1, user2] };
    }),
};

export const mockGetConnection = jest.fn().mockImplementation(() => {
    return () => {
        return mockDB;
    };
});
export const mockSetup = jest.fn().mockImplementation(() => {
    return () => {
        // do nothing
    };
});
export const mockConnect = jest.fn().mockImplementation(() => {
    return () => {
        // do nothing
    };
});

const mockUserDatabase = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});

export default mockUserDatabase;
