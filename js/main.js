
import VendingMachineController from './controllers/vendingMachineController.js';
import VendingMachineService from './services/vendingMachineService.js';
import UILayer from './views/vendingMachineView.js';

document.addEventListener("DOMContentLoaded", () => {
	VendingMachineController.init(UILayer, VendingMachineService)
  });