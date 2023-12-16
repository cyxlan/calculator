const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.num-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const clearBtn = document.querySelector('#clear-btn');

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(num1, num2, operator) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
}

let num1 = 0;
let num2 = 0;
let operator = "";
let currentValue = 0;

function updateValue(value) {
  if (value === 'clear') {
    currentValue = 0;
    value = 0;
  }
  if (currentValue === 0) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.textContent = currentValue;
}

numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    updateValue(btn.id);
  })
})

clearBtn.addEventListener('click', () => {
  updateValue('clear');
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    operator = btn.id;
    updateValue('clear');
  })
})