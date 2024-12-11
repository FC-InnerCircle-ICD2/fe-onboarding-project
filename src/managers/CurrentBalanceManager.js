class CurrentBalanceManager {
  #balance = 0;

  getBalance() {
    return this.#balance;
  }

  add(money) {
    if (money > 0) {
      this.#balance += money;
    }
    return this.#balance;
  }

  subtract(money) {
    if (this.canAfford(money)) {
      this.#balance -= money;
      return true;
    }
    return false;
  }

  returnChange() {
    const previousBalance = this.#balance;
    this.#balance = 0;
    return previousBalance;
  }

  // 잔액(balance)이 상품가격(price)보다 크거나 같은지 확인
  canAfford(price) {
    return this.#balance >= price;
  }

  // 잔액(balance)이 상품가격(price)보다 부족한 금액 계산
  getNeededMoney(price) {
    return (this.#balance - price) * -1;
  }
}

export default CurrentBalanceManager;
