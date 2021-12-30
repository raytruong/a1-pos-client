import Addon from '@/lib/models/Addon';
import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';

export const addonAJSON = {
    _id: 'addon:1234567890',
    _rev: '7-8596f70bd9ed85a3e133af283838f191',
    name: 'Gel Powder',
    price: new Currency(100),
    quantity: 1,
    category: 'Addon',
};

export const addonA = new Addon(
    addonAJSON._id,
    addonAJSON._rev,
    addonAJSON.name,
    addonAJSON.price,
    addonAJSON.quantity,
    addonAJSON.category,
);

export const addonBJSON = {
    _id: 'addon:0987654321',
    _rev: '3-8596f70bd9ed85a3e133af283838f191',
    name: 'Dipping Powder',
    price: new Currency(100),
    quantity: 2,
    category: 'Addon',
};

export const addonB = new Addon(
    addonBJSON._id,
    addonBJSON._rev,
    addonBJSON.name,
    addonBJSON.price,
    addonBJSON.quantity,
    addonBJSON.category,
);

export const itemAJSON = {
    _id: 'item:1234567890',
    _rev: '7-8596f70bd9ed85a3e133af283838f191',
    name: 'Classic Pedicure',
    price: new Currency(100),
    quantity: 1,
    category: 'Pedicure',
    addons: new Array<Addon>(addonA, addonB),
};

export const itemA = new Item(
    itemAJSON._id,
    itemAJSON._rev,
    itemAJSON.name,
    itemAJSON.price,
    itemAJSON.quantity,
    itemAJSON.category,
    itemAJSON.addons,
);

export const itemBJSON = {
    _id: 'item:0987654321',
    _rev: '1-5782E71F1E4BF698FA3793D9D5A96393',
    name: 'Kids Pedicure',
    price: new Currency(300),
    quantity: 2,
    category: 'Pedicure',
    addons: new Array<Addon>(addonA, addonB),
};

export const itemB = new Item(
    itemBJSON._id,
    itemBJSON._rev,
    itemBJSON.name,
    itemBJSON.price,
    itemBJSON.quantity,
    itemBJSON.category,
    itemBJSON.addons,
);

export const SerializedItemA = {
    _id: itemAJSON._id,
    _rev: itemAJSON._rev,
    name: itemAJSON.name,
    price: itemAJSON.price.toCents(),
    quantity: itemAJSON.quantity,
    category: itemAJSON.category,
    addons: [
        {
            _id: addonAJSON._id,
            _rev: addonAJSON._rev,
            name: addonAJSON.name,
            price: addonAJSON.price.toCents(),
            quantity: addonAJSON.quantity,
            category: addonAJSON.category,
        },
        {
            _id: addonBJSON._id,
            _rev: addonBJSON._rev,
            name: addonBJSON.name,
            price: addonBJSON.price.toCents(),
            quantity: addonBJSON.quantity,
            category: addonBJSON.category,
        },
    ],
};

export const SerializedItemB = {
    _id: itemBJSON._id,
    _rev: itemBJSON._rev,
    name: itemBJSON.name,
    price: itemBJSON.price.toCents(),
    quantity: itemBJSON.quantity,
    category: itemBJSON.category,
    addons: [
        {
            _id: addonAJSON._id,
            _rev: addonAJSON._rev,
            name: addonAJSON.name,
            price: addonAJSON.price.toCents(),
            quantity: addonAJSON.quantity,
            category: addonAJSON.category,
        },
        {
            _id: addonBJSON._id,
            _rev: addonBJSON._rev,
            name: addonBJSON.name,
            price: addonBJSON.price.toCents(),
            quantity: addonBJSON.quantity,
            category: addonBJSON.category,
        },
    ],
};
