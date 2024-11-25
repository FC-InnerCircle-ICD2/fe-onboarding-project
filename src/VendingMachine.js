class VendingMachine {
  constructor() {
    this.currentMoney = 0;
    this.insertedMoney = 0;
    this.logs = [];
  }

  /**
   * @param {string} money - 투입된 금액
   */
  insertMoney(money) {
    const parsedMoney = parseInt(money);
    if (parsedMoney > 0) {
      this.currentMoney += parsedMoney;
      this.logs.push(`${parsedMoney}원을 투입했습니다.`);
    }
    const insertedMoneyEl = document.querySelector('[aria-label="투입 금액"]');
    insertedMoneyEl.value = 0;
  }
}

export default VendingMachine;
