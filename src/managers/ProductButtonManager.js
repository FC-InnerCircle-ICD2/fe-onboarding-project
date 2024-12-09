class ProductButtonManager {
  #machineEl;
  #products;
  #handlers;
  #productButtonListEl;

  /**
   * @param {HTMLElement} machineEl - 자판기 DOM 요소
   * @param {Product[]} products - 상품 목록
   * @param {Object} handlers - 이벤트 핸들러 객체
   */
  constructor(machineEl, products, handlers) {
    this.#machineEl = machineEl;
    this.#productButtonListEl = this.#machineEl.querySelector(
      ".product-button-list"
    );
    this.#products = products;
    this.#handlers = handlers;
  }

  #createProductButtons() {
    this.#products.forEach((product) => {
      const button = document.createElement("button");
      const productNameEl = document.createElement("span");
      const productPriceEl = document.createElement("span");

      button.setAttribute("data-name", product.name);
      button.setAttribute("data-price", product.price);
      button.ariaLabel = `${product.name} 구매: ${product.price}원`;
      button.classList.add(
        "basis-[31%]",
        "p-3",
        "border",
        "border-black",
        "rounded-md",
        "bg-blue-300",
        "active:scale-95",
        "hover:brightness-105",
        "duration-200"
      );

      productNameEl.textContent = product.name;
      productNameEl.classList.add("line-clamp-1");
      productPriceEl.textContent = `${product.price}원`;

      button.appendChild(productNameEl);
      button.appendChild(productPriceEl);
      this.#productButtonListEl.appendChild(button);
    });
  }

  #initEventListeners() {
    this.#productButtonListEl.addEventListener("click", (e) => {
      const buttonEl = e.target.closest("button");
      if (!buttonEl) return;

      const productName = buttonEl.getAttribute("data-name");
      const targetProduct = this.#products.find(
        (product) => product.name === productName
      );
      if (targetProduct) {
        this.#handlers.onBuyProduct(targetProduct);
      }
    });

    this.#productButtonListEl.addEventListener("mousedown", (e) => {
      const buttonEl = e.target.closest("button");
      if (!buttonEl) return;

      const productPrice = parseInt(buttonEl.getAttribute("data-price"));
      this.#handlers.onProductMouseDown(productPrice);
    });

    this.#productButtonListEl.addEventListener("mouseup", () => {
      this.#handlers.onProductMouseUp();
    });

    this.#productButtonListEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const productPrice = parseInt(e.target.getAttribute("data-price"));
        this.#handlers.onProductKeyDown(productPrice);
      }
    });

    this.#productButtonListEl.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        this.#handlers.onProductKeyUp();
      }
    });
  }

  init() {
    this.#createProductButtons();
    this.#initEventListeners();
  }
}

export default ProductButtonManager;
