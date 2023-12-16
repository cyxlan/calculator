const display = document.querySelector('#display');
const history = document.querySelector('#history');
const numBtns = document.querySelectorAll('.num-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const clearBtn = document.querySelector('#clear-btn');
const equalsBtn = document.querySelector('#equals-btn');

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
  } else if (operator === "−") {
    return subtract(num1, num2);
  } else if (operator === "×") {
    return multiply(num1, num2);
  } else if (operator === "÷") {
    return divide(num1, num2);
  }
}

let num1, num2, operator;
let currentValue = 0;

function updateValue(value) {
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
  currentValue = 0;
  updateValue(0);
  num1 = null;
  num2 = null;
  operator = null;
  history.textContent = "";
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!num1) {
      num1 = Number(currentValue);
      history.textContent += num1;
    } else {
      num2 = Number(currentValue);
      history.textContent += num2;
    }
    currentValue = 0;
    if (num1 && num2) {
      updateValue(operate(num1, num2, operator));
      history.textContent += `${num2} = ${currentValue}`;
    }
    operator = btn.id;
    history.textContent += ` ${operator} `;
  })
})

equalsBtn.addEventListener('click', () => {
  if (num1) {
    num2 = Number(currentValue);
    currentValue = 0;
    updateValue(operate(num1, num2, operator));
    history.textContent += `${num2} = ${currentValue}`;
  }
})