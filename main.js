import './style.css'




const screen = document.querySelector("#screen");
const itemBtns = document.querySelectorAll(".btn");
const inputBtn = document.querySelector("#in_btn");
const inMoney = document.querySelector("#in_money");
const moneyLog = document.querySelector("#money_log");
const outBtn = document.querySelector("#out_btn");

let money = 0;
let logs = [];



const itemList = {
    "쿨라" : 1500,
    "속이사이다" : 1700,
    "판타지판타" : 1500,
    "오뎅국물" : 1800,
    "부장라떼" : 800,
    "레드뿔" : 2500,
    "핫세븐" : 1900
}

const products = document.querySelectorAll(".product");
const prices = document.querySelectorAll(".price");

for (let i = 0; i < products.length; i++) {
    products[i].innerText = itemList[i];
}

for (let i = 0; i < prices.length; i++) {
    prices[i].innerText = `${itemList[i]}원`;
}

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








