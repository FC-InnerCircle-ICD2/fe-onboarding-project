import './style.css'

const products_list = [ "쿨라", "속이사이다", "판타지판타", "오뎅국물",
    "부장라떼", "판타지판타", "레드뿔", "핫세븐", "커피우유"];
const prices_list = [1500, 1700, 1500, 1800, 800, 1500, 2500, 1900, 1400]

const products = document.querySelectorAll(".product");
const prices = document.querySelectorAll(".price");
const screen = document.querySelector("#screen");
const item_btns = document.querySelectorAll(".btn");
const input_btn = document.querySelector("#in_btn");
const in_money = document.querySelector("#in_money");

let money = 0;

// 상품 버튼 구현


for (let i = 0; i < products.length; i++) {
    products[i].innerText = products_list[i];
}

for (let i = 0; i < prices.length; i++) {
    prices[i].innerText = `${prices_list[i]}원`;
}


// 상품 버튼 클릭 이벤트
const item_click = (value) => {
    console.log("value",value)
}



item_btns.forEach(button => {
    button.addEventListener('click', () => {
        const price = button.querySelector('.price').textContent.replace(/[^0-9]/g, "");

        console.log(price);
    });
});


// 돈 투입 버튼


input_btn.addEventListener('click', () => {
    money =  money + parseInt(in_money.value);

    screen.innerText = money;

    in_money.value = 0;
});


// 돈 반환 버튼 (0으로 초기화)



