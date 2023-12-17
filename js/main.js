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
  return +(a / b).toFixed(3);
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
  if (Number(currentValue) === 0) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.textContent = currentValue;
}

// calculate the current equation, then set up variables for the next one
function calculate() {
  // prevent dividing by 0
  if (operator === "÷" && num2 === 0) {
    updateValue("no");
  } else {
    updateValue(operate(num1, num2, operator));
    history.textContent += `${num2} = ${currentValue}`;
    num1 = currentValue;
    operator = "";
  }
  currentValue = 0;
  num2 = null;
}

let num1, num2;
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
    }
    
    currentValue = 0;
    if (typeof num1 === "number" && typeof num2 === "number") {
      calculate();
    }
    if (!operator) {
      operator = btn.id;
      history.textContent += ` ${operator} `;
    }
  })
})

equalsBtn.addEventListener('click', () => {
  // if full equation has been entered
  if (typeof num1 === "number" && operator && (typeof num2 === "number" || currentValue)) {
    num2 = Number(currentValue);
    currentValue = 0;
    calculate();
  }
})