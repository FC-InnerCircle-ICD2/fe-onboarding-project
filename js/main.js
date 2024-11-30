let products = [];
let totalAmount = 0;


init();

async function init() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        products = data;
        setProducts(products);
        setupProductListEvents();
        setupAmountButtonEvents();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function setProducts(products) {
    const productsList = document.getElementById('products-list');
    const template = document.getElementById('product-template');

    products.forEach(product => {

        const clone = template.content.cloneNode(true);
        const button = clone.querySelector('.product');
        const nameSpan = clone.querySelector('.product-name');
        const priceSpan = clone.querySelector('.product-price');

        button.dataset.price = product.price;
        nameSpan.textContent = product.name; // 이름 설정
        priceSpan.textContent = `${product.price.toLocaleString()}원`; // 가격 설정

        productsList.appendChild(clone);
    });
}

// 이벤트 위임
function setupProductListEvents() {
    const productsList = document.getElementById('products-list');

    productsList.addEventListener('mousedown', (event) => {
        const button = event.target;
        if (button.classList.contains('product')) {
            const productPrice = parseInt(button.getAttribute('data-price'));
            const productName = button.innerText.split('\n')[0];
            
            if (isAffordable(productPrice)) {
                purchaseProduct(productPrice, productName);
            } else{
                updateDisplayWithPrice(productPrice); // 버튼을 누를 때 상품 가격 표시    
            }
        }
    });

    productsList.addEventListener('mouseup', (event) => {
        const button = event.target;
        if (button.classList.contains('product')) {
            updateDisplay(); // 버튼을 떼면 원래 잔액 표시
        }
    });
}

function setupAmountButtonEvents() {
    const insertButton = document.getElementById('insertAmountButton'); // 금액 투입 버튼
    const returnButton = document.getElementById('returnAmountButton'); // 금액 반환 버튼

    insertButton.addEventListener('click', insertAmount); // 금액 투입 동작 연결
    returnButton.addEventListener('click', returnAmount); // 금액 반환 동작 연결
}

function isAffordable(productPrice) {
    return (totalAmount >= productPrice) ? true : false;
}

function insertAmount() {
    const inputField = document.getElementById('inputAmount');
    const amount = parseInt(inputField.value);
    
    if (!isValidAmount(amount)) {
        logAction('숫자를 입력해주세요.'); // 요구사항엔 없지만 사용자에게 알리면 좋을 정보라 추가
        return;
    }
    
    totalAmount += amount;
    updateDisplay();
    logAction(`${addCommasToNumber(amount)}원을 투입했습니다.`);
    inputField.value = ''; // 입력란 초기화
}

function returnAmount() {
    if (totalAmount > 0) {
        logAction(`${addCommasToNumber(totalAmount)}원을 반환합니다.`);
        totalAmount = 0;
        updateDisplay();
    } else {
        logAction('투입된 금액이 없습니다.');
    }
}

function purchaseProduct(productPrice, productName) {

    if (!isValidAmount(productPrice)) {
        logAction('유효하지 않은 금액이빈다.'); // 요구사항엔 없지만 사용자에게 알리면 좋을 정보라 추가
        return;
    }

    totalAmount -= productPrice;
    updateDisplay();
    logAction(`${productName}를 구매했습니다.`);

}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = addCommasToNumber(totalAmount);
}

function updateDisplayWithPrice(price) {
    const display = document.getElementById('display');
    display.innerText = addCommasToNumber(price); // 상품 가격 표시
}

function logAction(message) {
    const log = document.getElementById('log');
    const logEntry = document.createElement('p');
    logEntry.innerText = message;
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight; // 자동 스크롤
}

function addCommasToNumber(input) {

    let number = typeof input === 'string' ? parseInt(input, 10) : input;

    if (typeof number !== 'number' || isNaN(number) || !Number.isInteger(number)) {
        console.error('유효하지 않은 정수입니다.');
        return;
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isValidAmount(amount) {
    return !isNaN(amount) && amount > 0;
}