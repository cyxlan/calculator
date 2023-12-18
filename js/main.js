const display = document.querySelector('#display');
const history = document.querySelector('#history');
const numBtns = document.querySelectorAll('.num-btn');
const decimalBtn = document.querySelector('#decimal-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const clearBtn = document.querySelector('#clear-btn');
const deleteBtn = document.querySelector('#delete-btn');
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

function toggleDisabled(btn, disable) {
  if (disable === true) {
    btn.setAttribute("disabled", "disabled");
  } else {
    btn.removeAttribute("disabled");
  }
}
function toggleBtns() {
  // disable updating number if an equation just finished & there isn't a new operator yet
  if (lastNum2) {
    numBtns.forEach((btn) => {
      toggleDisabled(btn, true);
    })
    toggleDisabled(deleteBtn, true);
  } else {
    numBtns.forEach((btn) => {
      toggleDisabled(btn, false);
    })
    toggleDisabled(deleteBtn, false);
  }
  // disable decimal point if current number already contains one
  if (String(currentValue).includes(".") || lastNum2) {
    toggleDisabled(decimalBtn, true);
  } else {
    toggleDisabled(decimalBtn, false);
  }
  // disable equals btn if full equation hasn't been entered
  if (typeof num1 !== "number" || !operator) {
    toggleDisabled(equalsBtn, true);
  } else {
    toggleDisabled(equalsBtn, false);
  }
}

function updateValue(value) {
  if (value === "delete") {
    if (currentValue.length > 1) {
      // delete last digit
      currentValue = currentValue.slice(0, -1);
    } else if (operator !== "" && Number(currentValue) === 0) {
      // delete last operator
      operator = "";
      history.textContent = history.textContent.slice(0, -3);
    } else {
      currentValue = 0;
    }
  } else if (currentValue !== "0." && Number(currentValue) === 0) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.textContent = currentValue;
  toggleBtns();
}

// calculate the current equation, then set up variables for the next one
function calculate() {
  // prevent dividing by 0
  if (operator === "÷" && num2 === 0) {
    updateValue("no");
  } else {
    // save last num2 value for repeat operation
    lastNum2 = num2;
    updateValue(+operate(num1, num2, operator).toFixed(3));
    history.textContent += `${num2} = ${currentValue}`;
    num1 = currentValue;
    num2 = null;
  }
  currentValue = "";
}

function enterDecimal() {
  if (Number(currentValue) === 0) {
    updateValue("0.");
  } else {
    updateValue(".");
  }
}
function enterOperator(thisOperator) {
  if (typeof num1 !== "number") {
    num1 = Number(currentValue);
    history.textContent += num1;
  } else if (currentValue !== "") {
    num2 = Number(currentValue);
  }
  
  currentValue = "";
  if (typeof num1 === "number" && operator && typeof num2 === "number") {
    calculate();
    // don't reset the operator if the calculation wasn't finished due to attempting to divide by 0
    if (!(operator === "÷" && num2 === 0))  {
      operator = "";
    }
  }
  // if the operator hasn't been set yet or the last calculation was a repeat operation
  if (!operator || lastNum2) {
    lastNum2 = null;
    operator = thisOperator;
    history.textContent += ` ${operator} `;
    toggleBtns();
  }
}
function enterEquals() {
  // if full equation has been entered
  if (typeof num1 === "number" && operator && (typeof num2 === "number" || currentValue)) {
    num2 = Number(currentValue);
    currentValue = "";
    calculate();
  }
  // if user clicks equals again without entering anything new, repeat the last operation
  else if (typeof num1 === "number" && operator && lastNum2) {
    num2 = lastNum2;
    lastNum2 = null;
    history.textContent += ` ${operator} `;
    calculate();
  }
}

let num1, num2, lastNum2;
let operator = "";
let currentValue = "";

toggleDisabled(equalsBtn, true);

numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    updateValue(btn.id);
  })
})

decimalBtn.addEventListener('click', enterDecimal)

clearBtn.addEventListener('click', () => {
  currentValue = "";
  updateValue(0);
  num1 = null;
  num2 = null;
  lastNum2 = null;
  operator = "";
  history.textContent = "";
  toggleBtns();
})

deleteBtn.addEventListener('click', () => {
  updateValue("delete");
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    enterOperator(btn.id);
  })
})

equalsBtn.addEventListener('click', enterEquals)

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e.key)) {
    updateValue(e.key);
  } else if (e.key === ".") {
    enterDecimal();
  } else if (e.key === "Delete" || e.key === "Backspace") {
    updateValue("delete");
  } else if (e.key === "+") {
    enterOperator("+");
  } else if (e.key === "-") {
    enterOperator("−")
  } else if (e.key === "*") {
    enterOperator("×");
  } else if (e.key === "/") {
    enterOperator("÷");
  } else if (e.key === "=" || e.key === "Enter") {
    enterEquals();
  }
})