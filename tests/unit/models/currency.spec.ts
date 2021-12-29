import 'jest';
import Currency from '@/lib/models/Currency';

describe('Currency class', () => {
    let currencyA: Currency;
    let currencyB: Currency;
    let currencyAJSON: Record<string, any>;
    let currencyBJSON: Record<string, any>;

    beforeEach(() => {
        currencyAJSON = {
            amount: 500,
        };
        currencyBJSON = {
            amount: 155,
        };
        currencyA = new Currency(currencyAJSON.amount);
        currencyB = new Currency(currencyBJSON.amount);
    });

    it('should construct a new currency', () => {
        expect(currencyA).toBeDefined();
        expect(currencyA).toBeInstanceOf(Currency);
    });

    it('should get the amount', () => {
        const spy = jest.spyOn(currencyA, 'amount', 'get');

        const expected = currencyAJSON.amount;
        const actual = currencyA.amount;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the amount', () => {
        const spy = jest.spyOn(currencyA, 'amount', 'set');

        const expected = currencyBJSON.amount;
        currencyA.amount = expected;
        const actual = currencyA.amount;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the sum given Currency', () => {
        const expected = currencyAJSON.amount + currencyBJSON.amount;
        const actual = currencyA.add(currencyB);
        expect(actual).toBeInstanceOf(Currency);
        expect(actual.amount).toStrictEqual(expected);
    });

    it('should ge the sum given a number', () => {
        const expected = currencyAJSON.amount + currencyBJSON.amount;
        const actual = currencyA.addNumeric(currencyBJSON.amount);
        expect(actual).toBeInstanceOf(Currency);
        expect(actual.amount).toStrictEqual(expected);
    });

    it('should get the difference given Currency', () => {
        const expected = currencyAJSON.amount - currencyBJSON.amount;
        const actual = currencyA.subtract(currencyB);
        expect(actual).toBeInstanceOf(Currency);
        expect(actual.amount).toStrictEqual(expected);
    });

    it('should get the difference given a number', () => {
        const expected = currencyAJSON.amount - currencyBJSON.amount;
        const actual = currencyA.subtractNumeric(currencyBJSON.amount);
        expect(actual).toBeInstanceOf(Currency);
        expect(actual.amount).toStrictEqual(expected);
    });

    it('should get the product given a number', () => {
        const expected = currencyAJSON.amount * currencyBJSON.amount;
        const actual = currencyA.multiply(currencyB.amount);
        expect(actual).toBeInstanceOf(Currency);
        expect(actual.amount).toStrictEqual(expected);
    });

    it('should get the dividend given a number', () => {
        const expected = 3;
        const actual = currencyA.divide(currencyB.amount);
        expect(actual).toBeInstanceOf(Currency);
        expect(actual.amount).toStrictEqual(expected);
    });

    it('should get the currency as a string', () => {
        const expected = '$5.00';
        const actual = currencyA.toString();
        expect(typeof actual).toStrictEqual('string');
        expect(actual).toStrictEqual(expected);
    });

    it('should get the amount as cents', () => {
        const expected = currencyAJSON.amount;
        const actual = currencyA.toCents();
        expect(typeof actual).toStrictEqual('number');
        expect(actual).toStrictEqual(expected);
    });
});
