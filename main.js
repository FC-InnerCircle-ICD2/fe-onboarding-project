import './style.css'

const screen = document.querySelector("#screen");
const itemBtns = document.querySelectorAll(".btn");
const inputBtn = document.querySelector("#in_btn");
const inMoney = document.querySelector("#in_money");
const moneyLog = document.querySelector("#money_log");
const outBtn = document.querySelector("#out_btn");

let money = 0;
let logs = [];



const itemList = [
    { name: "쿨라", price: 1500 },
    { name: "속이사이다", price: 1700 },
    { name: "판타지판타", price: 1500 },
    { name: "오뎅국물", price: 1800 },
    { name: "부장라떼", price: 800 },
    { name: "판타지판타", price: 1500 },
    { name: "레드뿔", price: 2500 },
    { name: "핫세븐", price: 1900 },
    { name: "커피우유", price: 1400 },
];



itemList.forEach(item => {
    const template = document.querySelector('#items');
    const clone = document.importNode(template.content, true);
    const productDiv = clone.querySelector('#product');
    const priceDiv = clone.querySelector('#price');

    productDiv.textContent = item.name;
    priceDiv.textContent = `${item.price} 원`;

    template.appendChild(clone);
});



screen.value = 0;
inMoney.value = 0;


// 상품 버튼 클릭 이벤트
itemBtns.forEach(button => {
    button.addEventListener('click', () => {
        const price = button.querySelector('.price').textContent.replace(/[^0-9]/g, "");
        const product = button.querySelector('.product').textContent;

        if(money < price) {
            screen.value = Number(price).toLocaleString();

            setTimeout(function () {
                logs.push(`돈이 부족합니다.`);
                moneyLog.value = logs.join("\n");
                moneyLog.scrollTop = money_log.scrollHeight;
                screen.value = Number(money).toLocaleString();

            },1000);

        }
        else {
            money = money - price;
            screen.value = Number(money).toLocaleString();
            logs.push(`${product}을 구매했습니다.`);
            moneyLog.value = logs.join("\n");
            moneyLog.scrollTop = moneyLog.scrollHeight;
        }
    });
});


// 돈 투입 버튼
inputBtn.addEventListener('click', () => {
    const result = inMoney.value.replace(/,/g, '')
    money =  money + parseInt(result);

    screen.value = Number(money).toLocaleString();

    logs.push(`${result}원을 투입했습니다.`);
    moneyLog.value = logs.join("\n");

    moneyLog.scrollTop = moneyLog.scrollHeight;

    inMoney.value = 0;
});


// 돈 반환 버튼 (0으로 초기화)
outBtn.addEventListener('click', () => {
    logs.push(`${money}원을 반환합니다.`);
    moneyLog.value = logs.join("\n");

    moneyLog.scrollTop = moneyLog.scrollHeight;

    money = 0;
    screen.value = money;

})








