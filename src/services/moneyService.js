const createMoneyService = (initialMoney = 0) => {
  let currentMoney = initialMoney;

  const validateMoneyInput = (amount) => {
    if (Number.isNaN(amount) || amount <= 0) {
      return { isValid: false, message: '올바른 금액을 입력해주세요.' };
    }

    if (amount > 100000000) {
      return { isValid: false, message: '1억원 이상은 투입할 수 없습니다.' };
    }

    if (currentMoney + amount > 100000000) {
      return { isValid: false, message: '1억원 이상은 투입할 수 없습니다.' };
    }

    return { isValid: true };
  };

  const insertMoney = (amount) => {
    const validation = validateMoneyInput(amount);
    if (!validation.isValid) {
      return validation;
    }

    currentMoney += amount;
    return {
      isValid: true,
      message: `${amount}원이 투입되었습니다.`,
      currentMoney,
    };
  };

  const deductMoney = (amount) => {
    if (currentMoney < amount) {
      return { isValid: false, message: '잔액이 부족합니다.' };
    }

    currentMoney -= amount;
    return {
      isValid: true,
      currentMoney,
    };
  };

  const returnMoney = () => {
    if (currentMoney <= 0) {
      return { amount: 0 };
    }

    const returnedAmount = currentMoney;
    currentMoney = 0;
    return {
      amount: returnedAmount,
      message: `${returnedAmount}원이 반환되었습니다.`,
    };
  };

  const getCurrentMoney = () => currentMoney;

  return {
    validateMoneyInput,
    insertMoney,
    deductMoney,
    returnMoney,
    getCurrentMoney,
  };
};

export default createMoneyService;
