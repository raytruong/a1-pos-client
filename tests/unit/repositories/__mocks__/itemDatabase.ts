export const addon1 = {
    _id: 'id1',
    _rev: 'rev1',
    name: 'name1',
    price: 1,
    quantity: 1,
    category: 'category1',
};

export const item1 = {
    _id: 'id1',
    _rev: 'rev1',
    name: 'name1',
    price: 1,
    quantity: 1,
    category: 'category1',
    addons: [addon1],
};

export const item2 = {
    _id: 'id2',
    _rev: 'rev2',
    name: 'name2',
    price: 2,
    quantity: 2,
    category: 'category2',
    addons: [],
};

const mockDB = {
    get: jest.fn().mockImplementation((_id) => {
        return _id === 'id1' ? item1 : item2;
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return { rows: [item1, item2] };
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

const mockItemDatabase = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});

export default mockItemDatabase;
