const user1 = {
    _id: 'id1',
    _rev: 'rev1',
    _pin: 'pin1',
    _name: 'name1',
};

const user2 = {
    _id: 'id2',
    _rev: 'rev2',
    _pin: 'pin2',
    _name: 'name2',
};

const addon1 = {
    _id: 'id1',
    _rev: 'rev1',
    cname: 'cname1',
    price: 1,
    quantity: 1,
    category: 'category1',
};

const item1 = {
    _id: 'id1',
    _rev: 'rev1',
    cname: 'cname1',
    price: 1,
    quantity: 1,
    category: 'category1',
    addons: [addon1],
};

const item2 = {
    _id: 'id2',
    _rev: 'rev2',
    cname: 'cname2',
    price: 2,
    quantity: 2,
    category: 'category2',
    addons: [],
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

const mockPouch = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});

export default mockPouch;
