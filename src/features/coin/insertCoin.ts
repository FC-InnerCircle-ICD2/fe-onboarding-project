import type { CoinController, TCoin } from '../../entities/coin';

export const insertCoin = (coin: TCoin, coinController: CoinController) => {
  coinController.insertCoin(coin);
};
