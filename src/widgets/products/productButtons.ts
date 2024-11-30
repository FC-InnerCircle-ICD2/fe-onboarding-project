import type { TCoinManager } from '../../entities/coin/model';
import {
  TProduct,
  type TProductManger,
  products,
} from '../../entities/products/model';
import { purchaseProduct } from '../../features/products/purchaseProduct';
import { updateProductWindow } from '../../features/products/updateProductWindow';
import { formatCurrency } from '../../shared/currency';
import { LogService } from '../../shared/log';

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
  logService: LogService;
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

  if (!buttons) return;

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

      updateProductWindow(window, currentCoin);
    }
  });

  buttons.addEventListener('mousedown', (event) => {
    const product = findClickedProduct(event);

    if (!product) return;

    updateProductWindow(window, product.price);
  });

  buttons.addEventListener('mouseleave', () => {
    const currentBalance = coinManager.getCoin();
    updateProductWindow(window, currentBalance);
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
