const createProductService = (products, moneyService) => {
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const validatePurchase = (product) => {
    const currentMoney = moneyService.getCurrentMoney();
    if (currentMoney < product.price) {
      return {
        isValid: false,
        message: `잔액이 부족합니다. (필요금액: ${product.price - currentMoney}원)`,
      };
    }

    return { isValid: true };
  };

  const purchaseProduct = (productId) => {
    const product = getProductById(productId);
    const validation = validatePurchase(product);

    if (!validation.isValid) {
      return validation;
    }

    const deductResult = moneyService.deductMoney(product.price);
    if (!deductResult.isValid) {
      return deductResult;
    }

    return {
      isValid: true,
      message: `${product.name}를 구매했습니다. (${product.price}원)`,
      product,
      currentMoney: deductResult.currentMoney,
    };
  };

  const getAllProducts = () => products;

  return {
    getProductById,
    validatePurchase,
    purchaseProduct,
    getAllProducts,
  };
};

export default createProductService;
