export const UILayer = (() => {
    const renderProducts = (productsList, template, products) => {
        productsList.innerHTML = ''; // 기존 리스트 초기화

        // biome-ignore lint/complexity/noForEach: <explanation>
        products.forEach((product) => {
            const clone = template.content.cloneNode(true);
            const button = clone.querySelector('.product');
            const nameSpan = clone.querySelector('.product-name');
            const priceSpan = clone.querySelector('.product-price');

            button.dataset.price = product.price;
            nameSpan.textContent = product.name;
            priceSpan.textContent = `${product.price.toLocaleString()}원`;

            productsList.appendChild(clone);
        });
    };

    const updateDisplay = (display, amount) => {
        display.innerText = formatNumber(amount);
    };

    const logAction = (log, message) => {
        const logEntry = document.createElement('p');
        logEntry.innerText = message;
        log.appendChild(logEntry);
        log.scrollTop = log.scrollHeight;
    };

    const formatNumber = (number) => {
        if (typeof number !== 'number' || Number.isNaN(number)) {
            console.error('Invalid number:', number);
            return;
        }
        return number.toLocaleString('ko-KR');  // 한국 로케일 사용
    }

    const clearInputField = (inputField) => {
        inputField.value = '';
    };

    return {
        renderProducts,
        updateDisplay,
        logAction,
        formatNumber,
        clearInputField,
    };
})();

export default UILayer;