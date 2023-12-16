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

function updateValue(value) {
  if (currentValue === 0) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.textContent = currentValue;
}

// calculate the current equation, then set up variables for the next one
function calculate() {
  updateValue(operate(num1, num2, operator));
  history.textContent += `${num2} = ${currentValue}`;
  num1 = currentValue;
  num2 = "";
  currentValue = 0;
}

let num1 = null;
    num2 = null;
let operator = "";
let currentValue = 0;

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
  operator = "";
  history.textContent = "";
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!num1) {
      num1 = Number(currentValue);
      history.textContent += num1;
    } else {
      num2 = Number(currentValue);
      // if num2 has never been set (first equation)
      if (num2 === null) {
        history.textContent += num2;
      }
    }
    
    currentValue = 0;
    if (num1 && num2) {
      calculate();
    }
    operator = btn.id;
    history.textContent += ` ${operator} `;
  })
})

equalsBtn.addEventListener('click', () => {
  // if full equation has been entered
  if (num1 && operator && (num2 || currentValue)) {
    num2 = Number(currentValue);
    currentValue = 0;
    calculate();
    operator = "";
  }
})