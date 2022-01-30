import { plainToInstance } from 'class-transformer';
import Item from '@/lib/models/Item';
import Transaction from '@/lib/models/Transaction';
import Addon from '@/lib/models/Addon';

export const transactionAJSON = {
    _id: 'txn:1640891179',
    _rev: '4-cq3t8gq8bs722paa4qi8sy5arbi9swvu',
    employee: 'John Doe',
    paymentType: 'Cash',
    items: [
        {
            _id: 'item:1539132218',
            _rev: '1-d3a8e0e5aa7c8fff0c376dac2d8a4007',
            name: 'Classic Pedicure',
            price: 100,
            quantity: 1,
            category: 'Pedicure',
            addons: [
                {
                    _id: 'addon:1723925225',
                    _rev: '7-8596f70bd9ed85a3e133af283838f191',
                    name: 'Gel Powder',
                    price: 100,
                    quantity: 1,
                    category: 'Addon',
                },
                {
                    _id: 'addon:1135275267',
                    _rev: '3-8596f70bd9ed85a3e133af283838f191',
                    name: 'Dipping Powder',
                    price: 100,
                    quantity: 2,
                    category: 'Addon',
                },
            ],
        },
    ],
};

export const transactionBJSON = {
    _id: 'txn:1475012924',
    _rev: '1-wd0sjb90y23bcuglgmcklf8x9vf7wnnl',
    employee: 'Jane Doe',
    paymentType: 'Credit Card',
    items: [
        {
            _id: 'item:1428376496',
            _rev: '3-o2v0rfvg2dpp36u4ojbfu5vawizyetng',
            name: 'Pedicure',
            price: 100,
            quantity: 2,
            category: 'Pedicure',
            addons: [
                {
                    _id: 'addon:953018296',
                    _rev: '1-cf776ua62gxogki0rcmnaansx5fxkqnk',
                    name: 'White Tips',
                    price: 200,
                    quantity: 1,
                    category: 'Addon',
                },
            ],
        },
    ],
};

export const addonAInstance = plainToInstance(
    Addon,
    transactionAJSON.items[0].addons[0],
);

export const addonBInstance = plainToInstance(
    Addon,
    transactionAJSON.items[0].addons[1],
);

export const itemAInstance = plainToInstance(Item, transactionAJSON.items[0]);

export const itemBInstance = plainToInstance(Item, transactionBJSON.items[0]);

export const addonCInstance = plainToInstance(
    Addon,
    transactionBJSON.items[0].addons[0],
);

export const transactionAInstance = plainToInstance(
    Transaction,
    transactionAJSON,
);

export const transactionBInstance = plainToInstance(
    Transaction,
    transactionBJSON,
);

export const mockDB = {
    get: jest.fn().mockImplementation((query) => {
        const _id = query._id ? query._id : query;
        switch (_id) {
            case transactionAJSON._id:
                return transactionAJSON;
            case transactionBJSON._id:
                return transactionBJSON;
        }
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return { rows: [transactionAJSON, transactionBJSON] };
    }),
    put: jest.fn().mockImplementation((serialized) => {
        const _id = serialized._id ? serialized._id : serialized;
        switch (_id) {
            case transactionAJSON._id:
                return transactionAJSON;
            case transactionBJSON._id:
                return transactionBJSON;
        }
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

const mockTransactionDatabase = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});

export default mockTransactionDatabase;
