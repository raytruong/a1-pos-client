import { SerializedItemA, SerializedItemB, itemA, itemB } from './item';
import Transaction from '@/lib/models/Transaction';
import Item from '@/lib/models/Item';

export const transactionAJSON = {
    _id: 'txn:1234567890',
    _rev: '9-3316j70km9de18a9m093jh287211ml2d',
    employee: 'John Doe',
    paymentType: 'Cash',
    items: new Array<Item>(itemA, itemB),
};

export const transactionA = new Transaction(
    transactionAJSON._id,
    transactionAJSON._rev,
    transactionAJSON.employee,
    transactionAJSON.paymentType,
    transactionAJSON.items,
);

export const SerializedTransactionA = {
    _id: transactionAJSON._id,
    _rev: transactionAJSON._rev,
    employee: transactionAJSON.employee,
    paymentType: transactionAJSON.paymentType,
    items: [SerializedItemA, SerializedItemB],
};

export const transactionBJSON = {
    _id: 'txn:0987654321',
    _rev: '7-8596f70bd9ed85a3e133af283838f191',
    employee: 'Jane Doe',
    paymentType: 'Credit Card',
    items: new Array<Item>(itemB),
};

export const transactionB = new Transaction(
    transactionBJSON._id,
    transactionBJSON._rev,
    transactionBJSON.employee,
    transactionBJSON.paymentType,
    transactionBJSON.items,
);

export const SerializedTransactionB = {
    _id: transactionBJSON._id,
    _rev: transactionBJSON._rev,
    employee: transactionBJSON.employee,
    paymentType: transactionBJSON.paymentType,
    items: [SerializedItemB],
};
