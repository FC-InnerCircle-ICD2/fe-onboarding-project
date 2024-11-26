let products = [];
let totalAmount = 0;


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
                button.innerHTML = `${product.name}<br><span>${product.price.toLocaleString()}원</span>`;
                button.onclick = () => purchaseProduct(button);

                buttonWrapper.appendChild(button);
                productsList.appendChild(buttonWrapper);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

function insertAmount() {
    const inputField = document.getElementById('inputAmount');
    const amount = parseInt(inputField.value);
    
    if (amount > 0) {
        totalAmount += amount;
        updateDisplay();
        logAction(`${amount.toLocaleString()}원을 투입했습니다.`);
        inputField.value = ''; // 입력란 초기화
    }
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

function purchaseProduct(button) {
    const price = parseInt(button.getAttribute('data-price'));
    
    if (totalAmount >= price) {
        totalAmount -= price;
        updateDisplay();
        logAction(`${button.innerText.split('\n')[0]}를 구매했습니다.`);
    } else {
        button.onmousedown = () => {
            updateDisplayWithPrice(price); // 버튼을 누를 때 상품 가격 표시
        };
        button.onmouseup = () => {
            updateDisplay(); // 버튼을 떼면 원래 잔액 표시
        };
    }
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

init();