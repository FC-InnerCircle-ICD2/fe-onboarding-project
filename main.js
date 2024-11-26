import { vendingContents } from "./data.js";

// 자판기 Button 들 랜더링
const buttonWrap = document.querySelector(".button_wrap");
const fragment = document.createDocumentFragment();

vendingContents.map((item) => {
  const button = document.createElement("button");
  const p = document.createElement("p");
  const span = document.createElement("span");

  button.className = "item_button";
  p.className = "item_name";
  span.className = "item_price";

  p.textContent = item.name;
  span.textContent = `${item.price}원`;

  button.appendChild(p);
  button.appendChild(span);
  fragment.appendChild(button); // Fragment에 추가
});

buttonWrap.appendChild(fragment); // Fragment를 한 번에 추가
