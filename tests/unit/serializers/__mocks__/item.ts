import Addon from '@/lib/models/Addon';
import Item from '@/lib/models/Item';
import Currency from '../../../../src/lib/models/Currency';

export const addonA = new Addon(
    'addon:1234567890',
    '7-8596f70bd9ed85a3e133af283838f191',
    'Gel Powder',
    new Currency(100),
    1,
    'Addon',
);

export const addonB = new Addon(
    'addon:0987654321',
    '7-8596f70bd9ed85a3e133af283838f191',
    'Dipping Powder',
    new Currency(100),
    2,
    'Addon',
);

export const mockItemA = new Item(
    'item:1234567890',
    '7-8596f70bd9ed85a3e133af283838f191',
    'Classic Pedicure',
    new Currency(100),
    1,
    'Pedicure',
    new Array<Addon>(addonA, addonB),
);

export const mockItemB = new Item(
    'item:0987654321',
    '1-5782E71F1E4BF698FA3793D9D5A96393',
    'Kids Pedicure',
    new Currency(300),
    2,
    'Pedicure',
    new Array<Addon>(addonA, addonB),
);
