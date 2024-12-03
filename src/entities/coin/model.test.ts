import { beforeEach, describe, expect, it } from 'vitest';
import { createCoinManager } from './model';

describe('createCoinManager', () => {
  let coinManager: ReturnType<typeof createCoinManager>;

  beforeEach(() => {
    coinManager = createCoinManager();
  });

  it('기본적으로 balance는 0원이다.', () => {
    expect(coinManager.getCoin()).toBe(0);
  });

  it('10,000원을 투입하면 balance가 10,000원이 된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toEqual(10000);
  });

  it('-10,000원을 투입하면 무시된다.', () => {
    coinManager.insertCoin(-10000);
    expect(coinManager.getCoin()).toEqual(0);
  });

  it('0원을 투입하면 무시된다.', () => {
    coinManager.insertCoin(0);
    expect(coinManager.getCoin()).toEqual(0);
  });

  it('1,500원을 사용하면 balance가 8,500원이 된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toEqual(10000);

    coinManager.useCoin(1500);
    expect(coinManager.getCoin()).toEqual(10000 - 1500);
  });

  it('0원을 사용하면 balance가 10,000원이 된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toEqual(10000);

    coinManager.useCoin(0);
    expect(coinManager.getCoin()).toEqual(10000 - 0);
  });

  it('여러 번 사용해도 balance가 올바르게 변경된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toEqual(10000);

    coinManager.useCoin(1500);
    expect(coinManager.getCoin()).toEqual(10000 - 1500);
    coinManager.useCoin(1500);
    expect(coinManager.getCoin()).toEqual(10000 - 1500 - 1500);
    coinManager.useCoin(1500);
    expect(coinManager.getCoin()).toEqual(10000 - 1500 - 1500 - 1500);
  });

  it('balance보다 높은 금액을 사용하면 무시된다.', () => {
    coinManager.insertCoin(10000);
    expect(coinManager.getCoin()).toEqual(10000);

    coinManager.useCoin(100000);
    expect(coinManager.getCoin()).toEqual(10000);
  });

  it('반환하면 balance가 0이 된다.', () => {
    const coin = 10000;

    coinManager.insertCoin(coin);
    expect(coinManager.getCoin()).toEqual(coin);

    const returnedCoin = coinManager.returnCoin();
    expect(returnedCoin).toBe(coin);
    expect(coinManager.getCoin()).toBe(0);
  });
});
