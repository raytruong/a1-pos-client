import Item from '@/lib/models/Item';
import Transaction from '@/lib/models/Transaction';
import Addon from '@/lib/models/Addon';
import Currency from '@/lib/models/Currency';

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

const addonAInstance = new Addon(
    transactionAJSON.items[0].addons[0]._id,
    transactionAJSON.items[0].addons[0]._rev,
    transactionAJSON.items[0].addons[0].name,
    new Currency(transactionAJSON.items[0].addons[0].price),
    transactionAJSON.items[0].addons[0].quantity,
    transactionAJSON.items[0].addons[0].category,
);

const addonBInstance = new Addon(
    transactionAJSON.items[0].addons[1]._id,
    transactionAJSON.items[0].addons[1]._rev,
    transactionAJSON.items[0].addons[1].name,
    new Currency(transactionAJSON.items[0].addons[1].price),
    transactionAJSON.items[0].addons[1].quantity,
    transactionAJSON.items[0].addons[1].category,
);

const ItemAInstance = new Item(
    transactionAJSON.items[0]._id,
    transactionAJSON.items[0]._rev,
    transactionAJSON.items[0].name,
    new Currency(transactionAJSON.items[0].price),
    transactionAJSON.items[0].quantity,
    transactionAJSON.items[0].category,
    new Array<Addon>(addonAInstance, addonBInstance),
);

export const transactionAInstance = new Transaction(
    transactionAJSON._id,
    transactionAJSON._rev,
    transactionAJSON.employee,
    transactionAJSON.paymentType,
    new Array<Item>(ItemAInstance),
);

const addonCInstance = new Addon(
    transactionBJSON.items[0].addons[0]._id,
    transactionBJSON.items[0].addons[0]._rev,
    transactionBJSON.items[0].addons[0].name,
    new Currency(transactionBJSON.items[0].addons[0].price),
    transactionBJSON.items[0].addons[0].quantity,
    transactionBJSON.items[0].addons[0].category,
);

const itemCInstance = new Item(
    transactionBJSON.items[0]._id,
    transactionBJSON.items[0]._rev,
    transactionBJSON.items[0].name,
    new Currency(transactionBJSON.items[0].price),
    transactionBJSON.items[0].quantity,
    transactionBJSON.items[0].category,
    new Array<Addon>(addonCInstance),
);

export const transactionBInstance = new Transaction(
    transactionBJSON._id,
    transactionBJSON._rev,
    transactionBJSON.employee,
    transactionBJSON.paymentType,
    new Array<Item>(itemCInstance),
);

export const mockDB = {
    get: jest.fn().mockImplementation((_id) => {
        return _id === transactionAJSON._id
            ? transactionAJSON
            : transactionBJSON;
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return { rows: [transactionAJSON, transactionBJSON] };
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

const mockTransactionDatabase = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});

export default mockTransactionDatabase;
