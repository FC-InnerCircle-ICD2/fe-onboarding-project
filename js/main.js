window.onload = function () {
    attachEventListeners();
};

// 금액 포맷 함수: 항상 숫자만을 표기(양수만 입력가능),세 자리마다 쉼표를 표시합니다.
function formatAmount(amount) {
    if (typeof amount === 'string') {
        amount = amount.replace(/,/g, '');
    }
    // 입력값이 숫자가 아니거나 음수인 경우 빈 문자열 반환
    if (isNaN(amount) || amount < 0) {
        return '';
    }
    // 금액을 세 자리마다 쉼표를 넣어서 포맷
    let formattedAmount = Number(amount).toLocaleString('en-US');

    return formattedAmount;
}

// 이벤트 리스너 등록 및 처리 함수
function attachEventListeners() {
    const inputDisplay = document.getElementById('input-display'); // 금액 투입 박스 
    const inputControls = document.querySelector('.input-controls'); // 투입,반환버튼 
    const amountDisplay = document.getElementById('amount-display'); // 상품 금액 표시 화면 
    const productButtons = document.querySelectorAll('.product-button'); // 상품 버튼들 

    let currentAmount = 0; // 현재 금액 (초기값은 0)
    let depositAmount = 0; // 투입된 금액

    // 금액을 투입할 때
    inputDisplay.addEventListener('input', function () {
        const formattedAmount = formatAmount(inputDisplay.value);
        inputDisplay.value = formattedAmount;
    });

    // 투입, 반환 버튼 클릭할 때
    inputControls.addEventListener('click', function (event) {
        if (event.target && event.target.matches('button.control-btn')) {
            const action = event.target.getAttribute('data-action');

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

    // 상품 버튼 클릭 시 처리
    productButtons.forEach(button => {
        const productPrice = parseInt(button.getAttribute('data-price')); 

        // 상품 버튼을 눌렀을 때
        button.addEventListener('mousedown', function () {
            if (currentAmount < productPrice) {
                // 투입된 금액이 부족하면 상품 가격을 표시
                amountDisplay.textContent = formatAmount(productPrice); 
                amountDisplay.style.color = 'red';
            }
        });

        // 상품 버튼에서 손을 뗐을 때
        button.addEventListener('mouseup', function () {
            // 버튼을 뗄 때는 다시 투입된 금액을 표시
            amountDisplay.textContent = formatAmount(currentAmount);
            amountDisplay.style.color = '';
        });

        // 상품 구매 처리
        button.addEventListener('click', function () {
            if (currentAmount >= productPrice) {
                // 금액이 충분하면 상품을 구매하고 금액 차감
                addLog(`${button.querySelector('.product-name').textContent}을(를) 구매 했습니다.`);
                currentAmount -= productPrice;
                amountDisplay.textContent = formatAmount(currentAmount);
            } 
        });
    });

    // 로그 추가 함수
    function addLog(message) {
        const logList = document.getElementById('log-list');
        const logItem = document.createElement('li');
        logItem.textContent = message;
        logList.appendChild(logItem);
    }
}
