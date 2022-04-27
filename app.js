const ulLeft = document.querySelector(".left-ul");
const ulLeftLi = document.querySelectorAll(".left-ul li");
const ulRight = document.querySelector(".right-ul");
const ulRightLi = document.querySelectorAll(".right-ul li");
const leftInput = document.querySelector(".left-input");
const rightInput = document.querySelector(".right-input");
const leftP = document.querySelector(".left-p");
const rightP = document.querySelector(".right-p");
let left = "RUB",
  right = "USD";
leftInput.value = 1;
eventListener();
checkLi();

function eventListener() {
  ulLeft.addEventListener("click", fromValue);
  ulRight.addEventListener("click", toValue);
  leftInput.addEventListener("keyup", getData);
  ulRight.addEventListener("click", getData);
  ulLeft.addEventListener("click", getData);
  document.addEventListener("DOMContentLoaded", getData);
}
function getData(e) {
  let out;
  e.preventDefault();
  fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      out = Object.values(data.rates)[0];
      leftP.innerText = `1 ${left} = ${out} ${right}`;
      rightP.innerText = `1 ${right} = ${1 / out} ${left}`;
      calculate(out);
    });
}
function fromValue(e) {
  e.preventDefault();

  if (e.target.className === "left-li") {
    left = e.target.innerText;
    checkLi();
  }
}
function toValue(e) {
  e.preventDefault();
  
  if (e.target.className === "right-li") {
    right = e.target.innerText;
    checkLi();
  }
}
function calculate(out) {
  rightInput.value = (out * leftInput.value).toFixed(3);
}
function checkLi() {
  ulLeftLi.forEach((item) => {
    item.classList.remove("active");
    if (left === item.innerText) {
      item.classList.add("active");
    }
  });
  ulRightLi.forEach((item) => {
    item.classList.remove("active");
    if (right === item.innerText) {
      item.classList.add("active");
    }
  });
}