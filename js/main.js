let products = [];
let totalAmount = 0;


init();

function init() {
    fetch('./data/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;

            const productsList = document.getElementById('products-list');

            products.forEach(product => {
                const buttonWrapper = document.createElement('div');
                buttonWrapper.classList.add('col', 's4');

                const button = document.createElement('button');
                button.classList.add('btn', 'product');
                button.setAttribute('data-price', product.price);
                button.textContent = product.name;

                const lineBreak = document.createElement('br'); // <br> 태그 생성
                button.appendChild(lineBreak);

                const priceSpan = document.createElement('span');
                priceSpan.textContent = `${product.price.toLocaleString()}원`;
                button.appendChild(priceSpan);

                buttonWrapper.appendChild(button);
                productsList.appendChild(buttonWrapper);
            });

            productEventHandler(productsList);


        })
        .catch(error => console.error('Error loading products:', error));
}

// 이벤트 위임
function productEventHandler(productsList) {
            
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

function isAffordable(productPrice) {
    return (totalAmount >= productPrice) ? true : false;
}

function insertAmount() {
    const inputField = document.getElementById('inputAmount');
    const amount = parseInt(inputField.value);
    
    if (isNaN(amount) || amount <= 0) {
        logAction('숫자를 입력해주세요.'); // 요구사항엔 없지만 사용자에게 알리면 좋을 정보라 추가
        return;
    }
        totalAmount += amount;
        updateDisplay();
        logAction(`${amount.toLocaleString()}원을 투입했습니다.`);
        inputField.value = ''; // 입력란 초기화
}

function returnAmount() {
    if (totalAmount > 0) {
        logAction(`${totalAmount.toLocaleString()}원을 반환합니다.`);
        totalAmount = 0;
        updateDisplay();
    } else {
        logAction('투입된 금액이 없습니다.');
    }
}

function purchaseProduct(productPrice, productName) {

    totalAmount -= productPrice;
    updateDisplay();
    logAction(`${productName}를 구매했습니다.`);

}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = totalAmount.toLocaleString();
}

function updateDisplayWithPrice(price) {
    const display = document.getElementById('display');
    display.innerText = price.toLocaleString(); // 상품 가격 표시
}

function logAction(message) {
    const log = document.getElementById('log');
    const logEntry = document.createElement('p');
    logEntry.innerText = message;
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight; // 자동 스크롤
}
