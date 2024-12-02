import './style.css'

const screen = document.querySelector("#screen");
const inMoney = document.querySelector("#inMoney");

let money = 0;
let logs = [];
screen.value = 0;
inMoney.value = 0;


function Log (text) {
    const moneyLog = document.querySelector("#moneyLog");
    logs.push(text);
    moneyLog.value = logs.join("\n");
    moneyLog.scrollTop = moneyLog.scrollHeight;
    screen.value = Number(money).toLocaleString();
}


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
    const button = clone.querySelector('#btn');
    const productDiv = clone.querySelector('#product');
    const priceDiv = clone.querySelector('#price');

    productDiv.textContent = item.name;
    priceDiv.textContent = `${item.price} 원`;


    button.addEventListener('click', () => {

        if(money < item.price || money === 0) {


            button.addEventListener('mousedown', () => {
                screen.value = item.price.toLocaleString();
            })

            button.addEventListener('mouseup', () => {
                Log(`돈이 부족합니다.`)
                screen.value = 0;
            })



        }
        else {
            money = money - item.price;
            Log(`${item.name}을 구매했습니다.`)
        }
    });

    template.appendChild(clone);
});




document.querySelector("#inputMoneyBtn").addEventListener('click', () => {
    const result = inMoney.value.replace(/,/g, '')
    money =  money + parseInt(result);

    Log(`${result}원을 투입했습니다.`)

    inMoney.value = 0;
});


document.querySelector("#outMoneyBtn").addEventListener('click', () => {
    Log(`${money}원을 반환합니다.`)

    money = 0;
    screen.value = money;

})








