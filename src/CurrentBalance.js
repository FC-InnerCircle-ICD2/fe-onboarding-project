class CurrentBalance {
  constructor() {
    this.balance = 0;
  }

  getBalance() {
    return this.balance;
  }

  add(amount) {
    if (amount > 0) {
      this.balance += amount;
    }
    return this.balance;
  }

  subtract(amount) {
    if (this.canAfford(amount)) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  returnChanges() {
    const previousBalance = this.balance;
    this.balance = 0;
    return previousBalance;
  }

  // 잔액(balance)이 상품가격(price)보다 크거나 같은지 확인
  canAfford(price) {
    return this.balance >= price;
  }

  // 잔액(balance)이 상품가격(price)보다 부족한 금액 계산
  getNeededMoney(price) {
    return (this.balance - price) * -1;
  }
}

export default CurrentBalance;
