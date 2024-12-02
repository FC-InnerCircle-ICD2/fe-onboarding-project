
import VendingMachineController from './controllers/vendingMachineController.js';
import VendingMachineService from './services/vendingMachineService.js';
import UILayer from './views/vendingMachineView.js';

document.addEventListener("DOMContentLoaded", () => {
	const state = {
		products: [],
		totalAmount: 0,
		productsList: document.getElementById('products-list'),
        template: document.getElementById('product-template'),
        display: document.getElementById('display'),
        log: document.getElementById('log'),
        inputField: document.getElementById('inputAmount'),
        insertButton: document.getElementById('insertAmountButton'),
        returnButton: document.getElementById('returnAmountButton'),
	};
	VendingMachineController.init(state,UILayer, VendingMachineService)
});