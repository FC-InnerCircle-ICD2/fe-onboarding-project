import type { CoinController } from '../../entities/coin/model';
import { returnCoin } from '../../features/coin/returnCoin';

export const handleReturnCoinButtonClick = (coinController: CoinController) => {
  returnCoin(coinController);
};
