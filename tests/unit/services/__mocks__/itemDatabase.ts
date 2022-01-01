import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import Currency from '@/lib/models/Currency';

export const itemAJSON = {
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
};

export const itemBJSON = {
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
};

const addonAInstance = new Addon(
    itemAJSON.addons[0]._id,
    itemAJSON.addons[0]._rev,
    itemAJSON.addons[0].name,
    new Currency(itemAJSON.addons[0].price),
    itemAJSON.addons[0].quantity,
    itemAJSON.addons[0].category,
);

const addonBInstance = new Addon(
    itemAJSON.addons[1]._id,
    itemAJSON.addons[1]._rev,
    itemAJSON.addons[1].name,
    new Currency(itemAJSON.addons[1].price),
    itemAJSON.addons[1].quantity,
    itemAJSON.addons[1].category,
);

const addonCInstance = new Addon(
    itemBJSON.addons[0]._id,
    itemBJSON.addons[0]._rev,
    itemBJSON.addons[0].name,
    new Currency(itemBJSON.addons[0].price),
    itemBJSON.addons[0].quantity,
    itemBJSON.addons[0].category,
);

export const itemAInstance = new Item(
    itemAJSON._id,
    itemAJSON._rev,
    itemAJSON.name,
    new Currency(itemAJSON.price),
    itemAJSON.quantity,
    itemAJSON.category,
    new Array<Addon>(addonAInstance, addonBInstance),
);

export const itemBInstance = new Item(
    itemBJSON._id,
    itemBJSON._rev,
    itemBJSON.name,
    new Currency(itemBJSON.price),
    itemBJSON.quantity,
    itemBJSON.category,
    new Array<Addon>(addonCInstance),
);

export const mockDB = {
    get: jest.fn().mockImplementation((_id) => {
        return _id === itemAJSON._id ? itemAJSON : itemBJSON;
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return { rows: [itemAJSON, itemBJSON] };
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

const mockItemDatabase = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});

export default mockItemDatabase;
