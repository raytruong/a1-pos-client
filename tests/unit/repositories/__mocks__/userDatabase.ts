import User from '@/lib/models/User';

export const userAJSON = {
    _id: 'user:1031448183',
    _rev: '3-rq290b2sjwgcwrm11ouc21wjuebl0lzj',
    pin: '9494',
    name: 'Jane Doe',
};

export const userBJSON = {
    _id: 'user:1051090379',
    _rev: '7-1ytd74mdaqx5cs7pb45z9evdtf5fwgvl',
    pin: '2321',
    name: 'John Doe',
};

export const userAInstance = new User(
    userAJSON._id,
    userAJSON._rev,
    userAJSON.pin,
    userAJSON.name,
);

export const userBInstance = new User(
    userBJSON._id,
    userBJSON._rev,
    userBJSON.pin,
    userBJSON.name,
);

export const mockDB = {
    get: jest.fn().mockImplementation((_id) => {
        return _id === userAJSON._id ? userAJSON : userBJSON;
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return { rows: [userAJSON, userBJSON] };
    }),
    put: jest.fn().mockImplementation((serialized) => {
        return serialized;
    }),
    delete: jest.fn().mockImplementation((serialized) => {
        return serialized;
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
