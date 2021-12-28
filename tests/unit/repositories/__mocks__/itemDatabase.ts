export const addon1 = {
    __id: 'id1',
    __rev: 'rev1',
    _name: 'name1',
    _price: 1,
    _quantity: 1,
    _category: 'category1',
};

export const item1 = {
    __id: 'id1',
    __rev: 'rev1',
    _name: 'name1',
    _price: 1,
    _quantity: 1,
    _category: 'category1',
    _addons: [addon1],
};

export const item2 = {
    __id: 'id2',
    __rev: 'rev2',
    _name: 'name2',
    _price: 2,
    _quantity: 2,
    _category: 'category2',
    _addons: [],
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
