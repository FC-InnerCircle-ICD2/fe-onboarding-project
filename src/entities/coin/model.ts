import { TProduct } from '../products/model';

export type TCoin = number;

export class CoinController {
  private balance: TCoin = 0;

  getCoin() {
    return this.balance;
  }

  insertCoin(newCoin: TCoin) {
    if (newCoin < 0) {
      alert('잘못된 투입 금액입니다.');
      return;
    }

    this.balance += newCoin;
  }

  useCoin(price: TProduct['price']) {
    this.balance -= price;
  }

  returnCoin() {
    const currentCoin = this.balance;
    this.balance = 0;

    return currentCoin;
  }
}
