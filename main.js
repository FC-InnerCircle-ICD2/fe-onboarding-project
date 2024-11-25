import './style.css'



const products_list = [ "쿨라", "속이사이다", "판타지판타", "오뎅국물",
    "부장라떼", "판타지판타", "레드뿔", "핫세븐", "커피우유"];
const prices_list = [1500, 1700, 1500, 1800, 800, 1500, 2500, 1900, 1400]

const products = document.querySelectorAll(".product");
const prices = document.querySelectorAll(".price");

for (let i = 0; i < products.length; i++) {
    products[i].innerText = products_list[i];
}

for (let i = 0; i < prices.length; i++) {
    prices[i].innerText = `${prices_list[i]}원`;
}

