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

function Equation() {
  this.num1 = null;
  this.num2 = null;
  this.operator = "";
  this.result = null;
  this.getResult = function() {
    return +operate(this.num1, this.num2, this.operator).toFixed(3);
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
  if (lastEquation.result && !currentEquation.operator) {
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
  if (String(currentValue).includes(".") || (lastEquation.result && !currentEquation.operator)) {
    toggleDisabled(decimalBtn, true);
  } else {
    toggleDisabled(decimalBtn, false);
  }
  // disable operator btns if no new number has been entered since last operator
  if (currentEquation.operator && currentValue === "") {
    operatorBtns.forEach((btn) => {
      toggleDisabled(btn, true);
    })
  } else {
    operatorBtns.forEach((btn) => {
      toggleDisabled(btn, false);
    })
  }
  // disable equals btn if full equation hasn't been entered
  // (allow for repeat operations, but disable if calculation was cancelled
  // because of trying to divide by 0 and user hasn't entered new number yet)
  if (typeof currentEquation.num1 !== "number" ||
      typeof currentEquation.num2 !== "number" && currentValue === "" && !lastEquation.result ||
      typeof currentEquation.num2 !== "number" && currentValue === "" && currentEquation.operator ||
      currentEquation.num2 === 0 && currentEquation.operator === "÷") {
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
    } else if (currentEquation.operator !== "" && Number(currentValue) === 0) {
      // delete last operator
      currentEquation.operator = "";
      history.textContent = history.textContent.slice(0, -3);
    } else {
      currentValue = 0;
    }
  } else if (!String(currentValue).includes(".") && Number(currentValue) === 0) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.textContent = currentValue;
  toggleBtns();
}

// calculate the current equation, then set up for the next one
function calculate() {
  // prevent dividing by 0
  if (currentEquation.operator === "÷" & currentEquation.num2 === 0) {
    updateValue("no");
  } else {
    currentEquation.result = currentEquation.getResult();
    updateValue(currentEquation.result);
    history.textContent += `${currentEquation.num2} =`;
    lastEquation = currentEquation;
    currentEquation = new Equation();
    currentEquation.num1 = currentValue;
  }
  currentValue = "";
}

function enterNum(num) {
  if (!lastEquation.result || currentEquation.operator) {
    updateValue(num);
  }
}
function enterDelete() {
  if (!deleteBtn.disabled) {
    updateValue("delete");
  }
}
function enterDecimal() {
  if (!decimalBtn.disabled) {
    if (Number(currentValue) === 0) {
      updateValue("0.");
    } else {
      updateValue(".");
    }
  }
}
function enterOperator(thisOperator) {
  if (typeof currentEquation.num1 !== "number") {
    currentEquation.num1 = Number(currentValue);
  } else if (currentValue !== "") {
    currentEquation.num2 = Number(currentValue);
  }
  //  if starting a new equation or the last calculation was a repeat operation
  if (!currentEquation.operator || lastEquation.num2) {
    history.textContent = currentEquation.num1;
  }
  currentValue = "";

  if (typeof currentEquation.num1 === "number" && currentEquation.operator && typeof currentEquation.num2 === "number") {
    calculate();
    // if a new equation started (calculation wasn't cancelled because of trying to divide by 0)
    if (!currentEquation.operator) {
      history.textContent = currentEquation.num1;
    }
  }
  if (!currentEquation.operator || lastEquation.num2) {
    currentEquation.operator = thisOperator;
    history.textContent += ` ${currentEquation.operator} `;
  }
  toggleBtns();
}
function enterEquals() {
  // if full equation has been entered
  if (typeof currentEquation.num1 === "number" && currentEquation.operator && (typeof currentEquation.num2 === "number" || currentValue !== "")) {
    currentEquation.num2 = Number(currentValue);
    currentValue = "";
    calculate();
  }
  // if user clicks equals again without entering anything new, repeat the last operation
  else if (typeof currentEquation.num1 === "number" && lastEquation.operator && !currentEquation.operator) {
    [currentEquation.num2, currentEquation.operator] = [lastEquation.num2, lastEquation.operator];
    history.textContent = `${currentEquation.num1} ${currentEquation.operator} `;
    calculate();
  }
  toggleBtns();
}

let currentValue = "";
let currentEquation = new Equation();
let lastEquation = new Equation();

toggleDisabled(equalsBtn, true);

numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    enterNum(btn.textContent);
  })
})

decimalBtn.addEventListener('click', enterDecimal)

clearBtn.addEventListener('click', () => {
  currentValue = "";
  updateValue(0);
  currentEquation = new Equation();
  lastEquation = new Equation();
  history.textContent = "";
  toggleBtns();
})

deleteBtn.addEventListener('click', enterDelete)

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    enterOperator(btn.textContent);
  })
})

equalsBtn.addEventListener('click', enterEquals)

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e.key)) {
    enterNum(e.key);
  } else if (e.key === ".") {
    enterDecimal();
  } else if (e.key === "Delete" || e.key === "Backspace") {
    enterDelete();
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