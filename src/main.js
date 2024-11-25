import "./style.css";

const products = [
  { id: 1, name: "콜라", price: 1500 },
  { id: 2, name: "사이다", price: 1500 },
  { id: 3, name: "환타", price: 1500 },
  { id: 4, name: "밀키스", price: 1800 },
  { id: 5, name: "커피", price: 2000 },
  { id: 6, name: "물", price: 1000 },
  { id: 7, name: "이온음료", price: 2000 },
  { id: 8, name: "주스", price: 1800 },
  { id: 9, name: "에너지드링크", price: 2500 },
];

function createVendingMachine() {
  const app = document.querySelector("#app");

  // 컨테이너 생성
  const container = document.createElement("div");
  container.className = "container";

  const vendingMachine = document.createElement("div");
  vendingMachine.className = "vending-machine";

  // 제목 생성
  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = "음료 자판기";

  // 컨텐츠 래퍼 생성
  const contentWrapper = document.createElement("div");
  contentWrapper.className = "content-wrapper";

  // 자판기 본체 생성
  const vendingBody = document.createElement("div");
  vendingBody.className = "vending-body";

  // 디스플레이 생성
  const displayContainer = document.createElement("div");
  displayContainer.className = "display-container";

  const moneyDisplay = document.createElement("div");
  moneyDisplay.className = "money-display";
  moneyDisplay.textContent = "0";

  displayContainer.appendChild(moneyDisplay);

  // 상품 그리드 생성
  const productGrid = document.createElement("div");
  productGrid.className = "product-grid";

  products.forEach((product) => {
    const button = document.createElement("button");
    button.className = "product-button";

    const nameSpan = document.createElement("span");
    nameSpan.className = "product-name";
    nameSpan.textContent = product.name;

    const priceSpan = document.createElement("span");
    priceSpan.className = "product-price";
    priceSpan.textContent = `${product.price}원`;

    button.append(nameSpan, priceSpan);
    productGrid.appendChild(button);
  });

  // 컨트롤 패널 생성
  const controlPanel = document.createElement("div");
  controlPanel.className = "control-panel";

  // 금액 섹션 생성
  const moneySection = document.createElement("div");
  moneySection.className = "money-section";

  const moneyContent = document.createElement("div");
  moneyContent.className = "money-content";

  const balanceText = document.createElement("p");
  balanceText.className = "balance-text";
  balanceText.textContent = "현재 잔액: ";

  const balanceAmount = document.createElement("span");
  balanceAmount.textContent = "0";
  balanceText.appendChild(balanceAmount);
  balanceText.appendChild(document.createTextNode("원"));

  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const moneyInput = document.createElement("input");
  moneyInput.type = "number";
  moneyInput.className = "money-input";
  moneyInput.placeholder = "금액 입력";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const insertButton = document.createElement("button");
  insertButton.className = "button button-insert";
  insertButton.textContent = "투입";

  const returnButton = document.createElement("button");
  returnButton.className = "button button-return";
  returnButton.textContent = "반환";

  // 로그 섹션 생성
  const logSection = document.createElement("div");
  logSection.className = "log-section";

  const logTitle = document.createElement("h2");
  logTitle.className = "log-title";
  logTitle.textContent = "작동 로그";

  const logContainer = document.createElement("div");
  logContainer.className = "log-container";

  // 요소 조립
  buttonContainer.append(insertButton, returnButton);
  inputContainer.append(moneyInput, buttonContainer);
  moneyContent.append(balanceText, inputContainer);
  moneySection.appendChild(moneyContent);

  logSection.append(logTitle, logContainer);
  controlPanel.append(moneySection, logSection);

  vendingBody.append(displayContainer, productGrid);
  contentWrapper.append(vendingBody, controlPanel);
  vendingMachine.append(title, contentWrapper);
  container.appendChild(vendingMachine);
  app.appendChild(container);
}

createVendingMachine();
