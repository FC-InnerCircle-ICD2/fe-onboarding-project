import type { TCoinManager } from '../../entities/coin/model';
import {
  TProduct,
  type TProductManger,
  products,
} from '../../entities/products/model';
import { purchaseProduct } from '../../features/products/purchaseProduct';
import { formatCurrency } from '../../shared/currency';
import { TLogService } from '../../shared/log';
import { updateDisplay } from '../../shared/updateDisplay';

export const createProductButton = (product: TProduct) => {
  const button = document.createElement('button');

  button.dataset.productId = product.id;
  button.className = 'product-button';
  button.innerHTML = `
    <p class='product-button_name'>${product.name}</p>
    <span class='product-button_price'>${formatCurrency(product.price)}원</span>
    `;

  return button;
};

type TInitializeProductProps = {
  productManager: TProductManger;
  coinManager: TCoinManager;
  logService: TLogService;
  elements: {
    buttons: HTMLDivElement;
    window: HTMLDivElement;
  };
};

export const initializeProductButtons = ({
  productManager,
  coinManager,
  logService,
  elements: { buttons, window },
}: TInitializeProductProps) => {
  const productButtons = products.map((product) =>
    createProductButton(product),
  );

  buttons.append(...productButtons);

  buttons.addEventListener('click', (event: MouseEvent) => {
    const product = findClickedProduct(event);

    if (!product) return;

    const purchaseResponse = purchaseProduct(
      product,
      productManager,
      coinManager,
      logService,
    );

    if (purchaseResponse.ok) {
      const currentCoin = coinManager.getCoin();
      updateDisplay(window, formatCurrency(currentCoin));
    }
  });

  buttons.addEventListener('mousedown', (event) => {
    const product = findClickedProduct(event);

    if (!product) return;

    updateDisplay(window, formatCurrency(product.price));
  });

  buttons.addEventListener('mouseleave', () => {
    const currentBalance = coinManager.getCoin();
    updateDisplay(window, formatCurrency(currentBalance));
  });
};

const findClickedProduct = (event: MouseEvent): TProduct | null => {
  if (!(event.target instanceof HTMLElement)) return null;

  const button = event.target.closest<HTMLButtonElement>('[data-product-id]');

  if (!button) return null;

  const productId = button.dataset.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) return null;

  return product;
};
