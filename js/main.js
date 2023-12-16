const display = document.querySelector('#display');
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
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
}

let num1, num2;
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
    if (!num1) {
      num1 = Number(currentValue);
    } else {
      num2 = Number(currentValue);
    }
  })
})

clearBtn.addEventListener('click', () => {
  updateValue('clear');
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentValue = 0;
    if (num1 && num2) {
      updateValue(operate(num1, num2, operator));
    }
    operator = btn.id;
  })
})

equalsBtn.addEventListener('click', () => {
  currentValue = 0;
  updateValue(operate(num1, num2, operator));
})