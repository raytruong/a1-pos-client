import 'jest';
import Transaction from '@/lib/models/Transaction';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import Currency from '@/lib/models/Currency';

describe('Transaction class', () => {
    let transaction: Transaction;
    let transactionJSON: Record<string, any>;

    let itemA: Item;
    let itemB: Item;
    let itemAJSON: Record<string, any>;
    let itemBJSON: Record<string, any>;

    let addonA: Addon;
    let addonB: Addon;
    let addonAJSON: Record<string, any>;
    let addonBJSON: Record<string, any>;

    beforeEach(() => {
        addonAJSON = {
            _id: 'addon:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Gel Powder',
            price: new Currency(100),
            quantity: 1,
            category: 'Addon',
        };
        addonBJSON = {
            _id: 'addon:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Dipping Powder',
            price: new Currency(200),
            quantity: 2,
            category: 'Addon',
        };
        addonA = new Addon(
            addonAJSON._id,
            addonAJSON._rev,
            addonAJSON.name,
            addonAJSON.price,
            addonAJSON.quantity,
            addonAJSON.category,
        );
        addonB = new Addon(
            addonBJSON._id,
            addonBJSON._rev,
            addonBJSON.name,
            addonBJSON.price,
            addonBJSON.quantity,
            addonBJSON.category,
        );
        itemAJSON = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Classic Pedicure',
            price: new Currency(100),
            quantity: 2,
            category: 'Pedicure',
            addons: new Array<Addon>(addonA, addonB),
        };
        itemBJSON = {
            _id: 'item:0987654321',
            _rev: '4-2221j59lj8ed85a3e133mf393898l421',
            name: 'Kids Manicure',
            price: new Currency(100),
            quantity: 3,
            category: 'Manicure',
            addons: new Array<Addon>(addonB),
        };
        itemA = new Item(
            itemAJSON._id,
            itemAJSON._rev,
            itemAJSON.name,
            itemAJSON.price,
            itemAJSON.quantity,
            itemAJSON.category,
            itemAJSON.addons,
        );
        itemB = new Item(
            itemBJSON._id,
            itemBJSON._rev,
            itemBJSON.name,
            itemBJSON.price,
            itemBJSON.quantity,
            itemBJSON.category,
            itemBJSON.addons,
        );
        transactionJSON = {
            _id: 'txn:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            employee: 'Saul Goodman',
            paymentType: 'Cash',
            items: new Array<Item>(itemA, itemB),
        };
        transaction = new Transaction(
            transactionJSON._id,
            transactionJSON._rev,
            transactionJSON.employee,
            transactionJSON.paymentType,
            transactionJSON.items,
        );
    });

    it('should construct a new transaction', () => {
        expect(transaction).toBeDefined();
        expect(transaction).toBeInstanceOf(Transaction);
    });

    it('should clone a new transaction', () => {
        const clonedTransaction = {
            employee: 'John Doe',
            paymentType: 'Credit Card',
            items: new Array<Item>(itemA, itemB),
        };

        const clone = transaction.clone(
            clonedTransaction.employee,
            clonedTransaction.paymentType,
            clonedTransaction.items,
        );

        expect(clone).toBeDefined();
        expect(clone).toBeInstanceOf(Transaction);
        expect(clone).toEqual(expect.objectContaining(clonedTransaction));
        expect(clone._id).not.toEqual(transaction._id);
        expect(clone._rev).toStrictEqual('');
    });

    it('should get the id of the transaction', () => {
        const spy = jest.spyOn(transaction, '_id', 'get');
        const expected = transactionJSON._id;

        const actual = transaction._id;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the id of the transaction', () => {
        const spy = jest.spyOn(transaction, '_id', 'set');
        const expected = 'txn:0987654321';

        transaction._id = expected;
        const actual = transaction._id;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the rev of the transaction', () => {
        const spy = jest.spyOn(transaction, '_rev', 'get');
        const expected = transactionJSON._rev;

        const actual = transaction._rev;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the rev of the transaction', () => {
        const spy = jest.spyOn(transaction, '_rev', 'set');
        const expected = '2-8596f70bd9ed85a3e133af283838f191';

        transaction._rev = expected;
        const actual = transaction._rev;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the employee of the transaction', () => {
        const spy = jest.spyOn(transaction, 'employee', 'get');
        const expected = transactionJSON.employee;

        const actual = transaction.employee;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the employee of the transaction', () => {
        const spy = jest.spyOn(transaction, 'employee', 'set');
        const expected = 'Jane Doe';

        transaction.employee = expected;
        const actual = transaction.employee;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the paymentType of the transaction', () => {
        const spy = jest.spyOn(transaction, 'paymentType', 'get');
        const expected = transactionJSON.paymentType;

        const actual = transaction.paymentType;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the paymentType of the transaction', () => {
        const spy = jest.spyOn(transaction, 'paymentType', 'set');
        const expected = 'Credit Card';

        transaction.paymentType = expected;
        const actual = transaction.paymentType;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the items of the transaction', () => {
        const spy = jest.spyOn(transaction, 'items', 'get');
        const expected = transactionJSON.items;

        const actual = transaction.items;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the items of the transaction', () => {
        const spy = jest.spyOn(transaction, 'items', 'set');
        const expected = new Array<Item>(itemA);

        transaction.items = expected;
        const actual = transaction.items;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the totalPrice of the transaction', () => {
        const spy = jest.spyOn(transaction, 'totalPrice', 'get');
        const expected = new Currency(1100);

        const actual = transaction.totalPrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
