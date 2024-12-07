import './style.css';
import { products } from './data/products.js';
import createMoneyService from './services/moneyService.js';
import createProductService from './services/productService.js';
import createMoneyController from './controllers/moneyController.js';
import createProductController from './controllers/productController.js';

const initializeApp = () => {
  const moneyService = createMoneyService();
  const productService = createProductService(products, moneyService);

  const moneyController = createMoneyController(moneyService);
  const productController = createProductController(
    productService,
    moneyService
  );

  moneyController.initialize();
  productController.initialize();
};

document.addEventListener('DOMContentLoaded', initializeApp);
