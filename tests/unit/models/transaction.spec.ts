import 'jest';
import Transaction from '@/lib/models/Transaction';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import Currency from '@/lib/models/Currency';

describe('Transaction class', () => {
    let transaction: Transaction;
    let itemA: Item;
    let itemB: Item;

    beforeEach(() => {
        const addonA = new Addon(
            'addon:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Gel Powder',
            new Currency(50),
            3,
            'Addon',
        );

        itemA = new Item(
            'item:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Classic Pedicure',
            new Currency(100),
            1,
            'Pedicure',
            new Array<Addon>(addonA),
        );

        itemB = new Item(
            'item:0987654321',
            '7-9333f80bd9ed85a3e133af283834j239',
            'Gel Manicure',
            new Currency(200),
            2,
            'Manicure',
            new Array<Addon>(),
        );

        transaction = new Transaction(
            'txn:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Saul Goodman',
            'Cash',
            new Array<Item>(itemA, itemB),
        );
    });

    it('should construct a new transaction', () => {
        expect(transaction).toBeDefined();
        expect(transaction).toBeInstanceOf(Transaction);
    });

    it('should build a new transaction', () => {
        const spyBuild = jest.spyOn(transaction, 'clone');

        const builtTransaction = transaction.clone(
            'Rust Colhe',
            'Credit Card',
            new Array<Item>(itemA, itemB),
        );

        expect(spyBuild).toHaveBeenCalled();
        expect(builtTransaction).toBeDefined();
        expect(builtTransaction).toBeInstanceOf(Transaction);
    });

    it('should throw exception on build without proper parameters', () => {
        const build = (): void => {
            transaction.clone();
        };

        expect(build).toThrow();
    });

    it('should get the id of the transaction', () => {
        const spyId = jest.spyOn(transaction, '_id', 'get');
        const expected = 'txn:1234567890';

        const actual = transaction._id;

        expect(spyId).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the id of the transaction', () => {
        const spyId = jest.spyOn(transaction, '_id', 'set');

        const expected = 'txn:0987654321';
        transaction._id = expected;
        const actual = transaction._id;

        expect(spyId).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the rev of the transaction', () => {
        const spyRev = jest.spyOn(transaction, '_rev', 'get');
        const expected = '7-8596f70bd9ed85a3e133af283838f191';

        const actual = transaction._rev;

        expect(spyRev).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the employee of the transaction', () => {
        const spyEmployee = jest.spyOn(transaction, 'employee', 'get');
        const expected = 'Saul Goodman';

        const actual = transaction.employee;

        expect(spyEmployee).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the employee of the transaction', () => {
        const spyEmployee = jest.spyOn(transaction, 'employee', 'set');

        const expected = 'Kim Wexler';
        transaction.employee = expected;
        const actual = transaction.employee;

        expect(spyEmployee).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the paymentType of the transaction', () => {
        const spyPaymentType = jest.spyOn(transaction, 'paymentType', 'get');
        const expected = 'Cash';

        const actual = transaction.paymentType;

        expect(spyPaymentType).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the paymentType of the transaction', () => {
        const spyPaymentType = jest.spyOn(transaction, 'paymentType', 'set');

        const expected = 'Credit Card';
        transaction.paymentType = expected;
        const actual = transaction.paymentType;

        expect(spyPaymentType).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the items of the transaction', () => {
        const spyItems = jest.spyOn(transaction, 'items', 'get');
        const expected = new Array<Item>(itemA, itemB);

        const actual = transaction.items;

        expect(spyItems).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the items of the transaction', () => {
        const spyItems = jest.spyOn(transaction, 'items', 'set');

        const expected = new Array<Item>(itemB);
        transaction.items = expected;
        const actual = transaction.items;

        expect(spyItems).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the items of the totalPrice', () => {
        const spyTotalPrice = jest.spyOn(transaction, 'totalPrice', 'get');
        const expected = new Currency(450);

        const actual = transaction.totalPrice;

        expect(spyTotalPrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should return JSON representation', () => {
        const spytoJSON = jest.spyOn(transaction, 'toJSON');
        const expected = {
            _id: 'txn:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            employee: 'Saul Goodman',
            paymentType: 'Cash',
            items: new Array<Item>(itemA, itemB),
        };

        const actual = transaction.toJSON();

        expect(spytoJSON).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
