import { plainToInstance } from 'class-transformer';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

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
    category: 'Kids',
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

export const addonAInstance = plainToInstance(Addon, itemAJSON.addons[0]);

export const addonBInstance = plainToInstance(Addon, itemAJSON.addons[1]);

export const addonCInstance = plainToInstance(Addon, itemAJSON.addons[0]);

export const itemAInstance = plainToInstance(Item, itemAJSON);

export const itemBInstance = plainToInstance(Item, itemBJSON);

export const mockDB = {
    get: jest.fn().mockImplementation((_id) => {
        switch (_id) {
            case itemAJSON._id:
                return itemAJSON;
            case itemBJSON._id:
                return itemBJSON;
            case addonAInstance._id:
                return itemAJSON.addons[0];
        }
    }),
    allDocs: jest.fn().mockImplementation((include_docs) => {
        return {
            rows: [
                { doc: itemAJSON },
                { doc: itemBJSON },
                { doc: itemAJSON.addons[0] },
            ],
        };
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

export const mockItemDatabase = jest.fn().mockImplementation(() => {
    return {
        getConnection: mockGetConnection(),
        setup: mockSetup(),
        connect: mockConnect(),
    };
});
