import { TProduct } from '../products/model';

export type TCoin = number;
export type TCoinManager = {
  getCoin: () => TCoin;
  insertCoin: (newCoin: TCoin) => void;
  useCoin: (price: TProduct['price']) => void;
  returnCoin: () => TCoin;
};

export const createCoinManager = (): TCoinManager => {
  let balance: TCoin = 0;

  return {
    getCoin: () => balance,
    insertCoin: (newCoin: TCoin) => {
      if (newCoin < 0) {
        return;
      }

      balance += newCoin;
    },
    useCoin: (price: TProduct['price']) => {
      balance -= price;
    },
    returnCoin: () => {
      const currentCoin = balance;
      balance = 0;

      return currentCoin;
    },
  };
};
