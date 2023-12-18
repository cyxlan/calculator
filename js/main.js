const display = document.querySelector('#display');
const history = document.querySelector('#history');
const numBtns = document.querySelectorAll('.num-btn');
const decimalBtn = document.querySelector('#decimal-btn');
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
    // save last num2 value for repeat operation
    lastNum2 = num2;
  }
  currentValue = "";
  num2 = null;
}

let num1, num2, lastNum2;
let operator = "";
let currentValue = "";

numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // prevent updating number if an equation just finished & there isn't a new operator yet
    if (!lastNum2) {
      updateValue(btn.id);
    }
  })
})

decimalBtn.addEventListener('click', () => {
  // prevent adding decimal point if current number already contains one
  if (!currentValue.includes(".")) {
    updateValue(".");
  }
})

clearBtn.addEventListener('click', () => {
  currentValue = "";
  updateValue(0);
  num1 = null;
  num2 = null;
  operator = "";
  history.textContent = "";
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (typeof num1 !== "number") {
      num1 = Number(currentValue);
      history.textContent += num1;
    } else if (currentValue !== "") {
      num2 = Number(currentValue);
    }
    
    currentValue = "";
    if (typeof num1 === "number" && typeof num2 === "number") {
      calculate();
      operator = "";
    }
    // if the operator hasn't been set yet or the last calculation was a repeat operation
    if (!operator || lastNum2) {
      lastNum2 = null;
      operator = btn.id;
      history.textContent += ` ${operator} `;
    }
  })
})

equalsBtn.addEventListener('click', () => {
  // if full equation has been entered
  if (typeof num1 === "number" && operator && (typeof num2 === "number" || currentValue)) {
    num2 = Number(currentValue);
    currentValue = "";
    calculate();
  }
  // if user clicks equals again without entering anything new, repeat the last operation
  else if (typeof num1 === "number" && operator) {
    num2 = lastNum2;
    lastNum2 = null;
    history.textContent += ` ${operator} `;
    calculate();
  }
})