
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

    // 금액을 투입 할 때
    inputDisplay.addEventListener('input', function () {
        const formattedAmount = formatAmount(inputDisplay.value);
        inputDisplay.value = formattedAmount;
    });

    // 투입, 반환 버튼 클릭할 때
    inputControls.addEventListener('click', function (event) {
        if (event.target && event.target.matches('button.control-btn')) {
            const action = event.target.getAttribute('data-action');

            if (action === 'deposit') {
                let currentAmount = parseInt(amountDisplay.textContent.replace(/,/g, '')) || 0; // 현재 금액
                let depositAmount = parseInt(inputDisplay.value.replace(/,/g, '')) || 0; // 투입된 금액

                if (depositAmount > 0) {
                    currentAmount += depositAmount;
                    amountDisplay.textContent = formatAmount(currentAmount);
                    inputDisplay.value = '';
                }
            } else if (action === 'return') {
                amountDisplay.textContent = '0';
                inputDisplay.value = '';
            }
        }
    });
}
