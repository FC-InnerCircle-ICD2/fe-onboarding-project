import '@testing-library/jest-dom';
import UILayer from '../views/vendingMachineView.js';


// Given: 테스트를 하기 위해 세팅하는 주어진 환경
// When: 테스트를 하기 위한 조건으로 프론트엔드에선 사용자와의 상호작용인 경우도 많음
// Then: 예상 결과를 나타내며 의도대로 동작하는지 검증 및 확인할 수 있음

describe('UILayer', () => {
    // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
    let productsList, template, display, log, inputField;

    beforeEach(() => {
        // 테스트용 DOM 요소 생성
        document.body.innerHTML = `
            <div>
                <ul id="productsList"></ul>
                <template id="productTemplate">
                    <div class="product">
                        <span class="product-name"></span>
                        <span class="product-price"></span>
                    </div>
                </template>
                <span id="display"></span>
                <div id="log"></div>
                <input id="inputField" />
            </div>
        `;

        productsList = document.getElementById('productsList');
        template = document.getElementById('productTemplate');
        display = document.getElementById('display');
        log = document.getElementById('log');
        inputField = document.getElementById('inputField');
    });

    describe('renderProducts()', () => {
        const products = [
            { id: 1, name: '상품 1', price: 1000 },
            { id: 2, name: '상품 2', price: 2000 },
        ];
    
        it('products 배열의 항목 (혹은 값) 들이 템플릿 DOM에 동일하게 반영되어야 한다.', () => {
            UILayer.renderProducts(productsList, template, products);
    
            const renderedProducts = productsList.querySelectorAll('.product');
            expect(renderedProducts.length).toBe(products.length); // 상품 개수 확인
            expect(renderedProducts[0].querySelector('.product-name').textContent).toBe('상품 1');
            expect(renderedProducts[0].querySelector('.product-price').textContent).toBe('1,000원');
            expect(renderedProducts[1].querySelector('.product-name').textContent).toBe('상품 2');
            expect(renderedProducts[1].querySelector('.product-price').textContent).toBe('2,000원');
        });
    
        it('products 템플릿 DOM이 productsList DOM 하위에 렌더링되어야 합니다.', () => {
            UILayer.renderProducts(productsList, template, products);
    
            expect(productsList).not.toBeEmptyDOMElement();

            const renderedProducts = productsList.querySelectorAll('.product');
    
            // biome-ignore lint/complexity/noForEach: <explanation>
            renderedProducts.forEach(product => {
                expect(productsList).toContainElement(product);
            });
        });
    });


    describe('updateDisplay()', () => {
        it('입력된 amount가 포맷된 형태로 변환되어 display에 출력되어야 한다.', () => {
            UILayer.updateDisplay(display, 123456);
    
            expect(display.innerText).toBe('123,456');
        });
    });

    describe('logAction()', () => {
        it('호출 시 메시지를 담은 p 태그가 log DOM 하위에 생성되어야 한다.', () => {
            UILayer.logAction(log, '테스트 로그 1');
    
            const logEntries = log.querySelector('p');
            expect(logEntries).not.toBeNull(); 
            expect(logEntries.innerText).toBe('테스트 로그 1');
        });
    
        it('호출 시 log 영역의 스크롤이 하단으로 이동해야 한다.', () => {
            log.scrollTop = 0; 
    
            UILayer.logAction(log, '테스트 로그 2');
    
            expect(log.scrollTop).toBe(log.scrollHeight);
        });
    });


    describe('formatNumber()', () => {    
    
        // formatNumber 테스트 (정상 입력)
        it('소수가 아닌 0또는 양수의 숫자를 포맷해야 한다.', () => {
            expect(UILayer.formatNumber(1000)).toBe('1,000');
            expect(UILayer.formatNumber(123456789)).toBe('123,456,789');
        });


        afterEach(() => {
            jest.restoreAllMocks(); // Mock 초기화
        });

        // 잘못된 입력 처리 테스트
        it('양수의 숫자가 아닌 입력값은 에러 메시지를 로그에 남기고 undefined를 반환해야 한다.', () => {
            console.error = jest.fn();

            // 음수 테스트
            expect(UILayer.formatNumber(-1000)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', -1000);

            // 숫자 문자열 처리
            expect(UILayer.formatNumber('1000')).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', '1000');

            // 잘못된 입력값 테스트
            expect(UILayer.formatNumber('invalid')).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', 'invalid');

            // NaN
            expect(UILayer.formatNumber(Number.NaN)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', Number.NaN);

            // null
            expect(UILayer.formatNumber(null)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', null);

            // undefined
            expect(UILayer.formatNumber(undefined)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', undefined);

            // 공백 및 빈 문자열 처리
            expect(UILayer.formatNumber('')).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', '');

            expect(UILayer.formatNumber(' ')).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', ' ');

            // 소수 처리
            expect(UILayer.formatNumber(1234.5678)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Invalid number:', 1234.5678);
        });
    })


    describe('clearInputField()', () => {
        it('입력 필드를 "" 으로 바꾸어야 한다.', () => {
            inputField.value = '임의의 텍스트';
            UILayer.clearInputField(inputField);
    
            expect(inputField.value).toBe('');
        });
    });

});