import Dinero from 'dinero.js';
import { Expose } from 'class-transformer';

class Currency {
    constructor(amount: number) {
        this._amount = amount;
    }

    @Expose({ name: 'amount' })
    private _amount: number;

    get amount(): number {
        return this._amount;
    }

    set amount(amount: number) {
        this._amount = amount;
    }

    add(currency: Currency): Currency {
        const c1 = Dinero({ amount: this.amount });
        const c2 = Dinero({ amount: currency.amount });
        const sum = c1.add(c2);
        return new Currency(sum.getAmount());
    }

    addNumeric(amount: number): Currency {
        const c1 = Dinero({ amount: this.amount });
        const c2 = Dinero({ amount: amount });
        const sum = c1.add(c2);
        return new Currency(sum.getAmount());
    }

    subtract(currency: Currency): Currency {
        const c1 = Dinero({ amount: this.amount });
        const c2 = Dinero({ amount: currency.amount });
        const diff = c1.subtract(c2);
        return new Currency(diff.getAmount());
    }

    subtractNumeric(amount: number): Currency {
        const c1 = Dinero({ amount: this.amount });
        const c2 = Dinero({ amount: amount });
        const diff = c1.subtract(c2);
        return new Currency(diff.getAmount());
    }

    multiply(multiplier: number): Currency {
        const c1 = Dinero({ amount: this.amount });
        const product = c1.multiply(multiplier);
        return new Currency(product.getAmount());
    }

    divide(divisor: number): Currency {
        const c1 = Dinero({ amount: this.amount });
        const dividend = c1.divide(divisor);
        return new Currency(dividend.getAmount());
    }

    toString(): string {
        return Dinero({ amount: this.amount }).toFormat();
    }

    toCents(): number {
        return Dinero({ amount: this.amount }).getAmount();
    }
}

export default Currency;
