import type { CoinController, TCoin } from '../../entities/coin/model';

export const insertCoin = (coin: TCoin, coinController: CoinController) => {
  coinController.insertCoin(coin);
};
