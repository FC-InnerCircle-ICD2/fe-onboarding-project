import { products } from './products.js'

window.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
});

/**
 * 금액 포맷해 세 자리마다 쉼표를 추가하고 양수로만 표기 합니다.
 * 
 * @param {*} amount 1000 단위가 넘어가면 쉼표를 포함한 문자열로 받음 
 * @returns {string} 금액을 쉼표로 구분한 문자열 형태로 반환
 */
function formatAmount(amount) {
    if (typeof amount === 'string') {
        amount = amount.replace(/,/g, '');
    }
    // 입력값이 숫자가 아니거나 음수인 경우 빈 문자열 반환
    if (isNaN(amount) || amount < 0) {
        return '';
    }
    // 금액을 세 자리마다 쉼표를 넣어서 포맷
    const formattedAmount = Number(amount).toLocaleString('en-US');

    return formattedAmount;
}

/**
 * 상품 버튼 생성 함수 
 * @param {object} product 상품 정보를 포함하는 객체  
 * @returns {HTMLButtonElement} 생성된 상품 버튼 
 */
function createProductButton(product) {
    const template = document.getElementById('product-button-template');
    const clone = template.content.cloneNode(true); 

    const nameDiv = clone.querySelector('.product-name');
    nameDiv.textContent = product.name;

    const priceDiv = clone.querySelector('.product-price');
    priceDiv.textContent = `${formatAmount(product.price)}원`;

    const button = clone.querySelector('button');
    button.dataset.price = product.price

    return button;
}

/**
 * 이벤트 리스너를 등록 및 처리 
 * 금액 투입, 반환 및 상품 버튼 클릭 등의 동작을 처리합니다.
 */
function attachEventListeners() {
    const inputDisplay = document.getElementById('input-display'); // 금액 투입 박스 
    const inputControls = document.querySelector('.input-controls'); // 투입,반환버튼 
    const amountDisplay = document.getElementById('amount-display'); // 상품 금액 표시 화면 
    const productButtonsContainer = document.querySelector('.product-buttons'); // 상품 버튼 컨테이너
    const logBox = document.querySelector('.log-box'); //로그 컨테이너
    const logList = document.getElementById('log-list'); //로그 리스트 박스

    let currentAmount = 0; // 현재 금액 (초기값은 0)
    let depositAmount = 0; // 투입된 금액

    // 금액을 투입할 때
    inputDisplay.addEventListener('input', function () {
        const formattedAmount = formatAmount(inputDisplay.value);
        inputDisplay.value = formattedAmount;
    });

    // 투입, 반환 버튼 클릭할 때
    inputControls.addEventListener('click', function (event) {
        if (event.target?.matches('button.control-btn')) {
            const action = event.target.dataset.action;

            if (action === 'deposit') {
                depositAmount = parseInt(inputDisplay.value.replace(/,/g, '')) || 0; // 투입된 금액

                if (depositAmount > 0) {
                    addLog(`${formatAmount(depositAmount)}원을 투입 했습니다.`);
                    currentAmount += depositAmount;
                    amountDisplay.textContent = formatAmount(currentAmount);
                    inputDisplay.value = '';
                }
            } else if (action === 'return') {
                if (currentAmount > 0) {
                    addLog(`${formatAmount(currentAmount)}원을 반환 했습니다.`);  // 반환 로그 추가
                }
                currentAmount = 0;
                amountDisplay.textContent = '0';
                inputDisplay.value = ''; 
            }
        }
    });

    // 상품 버튼 동적으로 생성 및 클릭 시 처리
    products.forEach(product => {
        const button = createProductButton(product); // 상품 버튼 생성
        productButtonsContainer.appendChild(button);

        // 상품 버튼을 눌렀을 때 (금액 부족 시 색상 변경)
        button.addEventListener('mousedown', function () {
            if (currentAmount < product.price) {
                amountDisplay.textContent = formatAmount(product.price);
                amountDisplay.style.color = 'red';
            }
        });

        // 상품 버튼에서 손을 뗐을 때 (금액 표시 복원)
        button.addEventListener('mouseup', function () {
            amountDisplay.textContent = formatAmount(currentAmount);
            amountDisplay.style.color = '';
        });

        // 상품 버튼 클릭 시 처리
        button.addEventListener('click', function () {
            if (currentAmount >= product.price) {
                // 금액이 충분하면 상품을 구매하고 금액 차감
                addLog(`${button.querySelector('.product-name').textContent}을(를) 구매 했습니다.`);
                currentAmount -= product.price;
                amountDisplay.textContent = formatAmount(currentAmount);
            } 
        });
    });

    /**
     * 로그 항목을 생성해 로그 리스트에 추가하는 함수 
     * 금액 투입, 상품 구매, 잔돈 반환 등의 메시지를 받아 해당 메시지를 로그에 추가
     * @param {string} message 
     * @returns {void} 반환값 없이 로그 항목이 화면에 추가 됩니다.
     */
    function addLog(message) {
        const logItem = document.createElement('li');

        logItem.textContent = message;
        logList.appendChild(logItem);

        logBox.scrollTop = logList.scrollHeight;
    }
}
