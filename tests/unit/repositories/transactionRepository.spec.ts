import 'jest';
import { container } from 'tsyringe';
import TransactionRepository from '@/lib/repositories/TransactionRepository';
import Pouch from '@/lib/databases/Pouch';
import Transaction from '@/lib/models/Transaction';
import mockTransactionDatabase, {
    mockConnect,
    mockGetConnection,
    mockSetup,
    transactionAInstance,
    transactionBInstance,
    mockDB,
} from './__mocks__/transactionDatabase';

describe('TransactionRepository class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockTransactionDatabase);

    let repository: TransactionRepository;
    let transactionA: Transaction;
    let transactionB: Transaction;

    beforeEach(() => {
        repository = mockContainer.resolve(TransactionRepository);
        transactionA = transactionAInstance;
        transactionB = transactionBInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create a TransactionRepository', () => {
        expect(repository).toBeDefined();
        expect(mockSetup).toHaveBeenCalled();
        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockConnect).toHaveBeenCalled();
    });

    it('should get the name', () => {
        const expected = 'TransactionRepository';
        const actual = repository.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get transaction1 by id', async () => {
        const expected = {
            __id: transactionA._id,
        };
        const actual = await repository.get(transactionA._id);
        expect(actual).toBeInstanceOf(Transaction);
        expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('should get transactionB by id', async () => {
        const expected = {
            __id: transactionB._id,
        };
        const actual = await repository.get(transactionB._id);
        expect(actual).toBeInstanceOf(Transaction);
        expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('should get all transactions', async () => {
        const actual = await repository.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual.length).toEqual(2);
    });

    it('should save a transaction and not pass a _rev tag', async () => {
        const spy = jest.spyOn(mockDB, 'put');
        await repository.save(transactionA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._rev).not.toBeDefined();
    });

    it('should update an existing transaction and pass a _rev tag', async () => {
        const spyPut = jest.spyOn(mockDB, 'put');
        const spyGet = jest.spyOn(mockDB, 'get');
        await repository.update(transactionA);
        expect(spyGet).toHaveBeenCalled();
        expect(spyGet.mock.calls[0][0]._rev).toStrictEqual(transactionA._rev);
        expect(spyPut).toHaveBeenCalled();
        expect(spyPut.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spyPut.mock.calls[0][0]._rev).toStrictEqual(transactionA._rev);
    });

    it('should delete an existing transaction', async () => {
        const spy = jest.spyOn(mockDB, 'delete');
        await repository.delete(transactionA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._id).toStrictEqual(transactionA._id);
        expect(spy.mock.calls[0][0]._rev).toStrictEqual(transactionA._rev);
    });
});
