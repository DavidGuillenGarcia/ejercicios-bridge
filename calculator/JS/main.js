const result = document.getElementById("result");
let currentOperation;

const stringToInt = (string) => {
  return Number(string);
};

const sum = (number1, number2) => {
  return stringToInt(number1) + stringToInt(number2);
};

const subtract = (number1, number2) => {
  return stringToInt(number1) - stringToInt(number2);
};

const multiply = (number1, number2) => {
  return stringToInt(number1) * stringToInt(number2);
};

const divide = (number1, number2) => {
  return stringToInt(number1) / stringToInt(number2);
};

const power = (number1, number2) => {
  return Math.pow(number1, number2);
};

const squareRoot = (number1) => {
  return Math.sqrt(number1);
};

const calc = () => {
  if (result.innerText.includes(currentOperation)) {
    console.log(currentOperation);
    console.log(result.innerText.charAt(result.innerText.length - 1));
    if (
      result.innerText.charAt(result.innerText.length - 1) != currentOperation
    ) {
      let numbers = result.innerText.split(currentOperation);
      if (currentOperation == "+") {
        result.innerText = sum(numbers[0], numbers[1]);
      }
      if (currentOperation == "-") {
        result.innerText = subtract(numbers[0], numbers[1]);
      }
      if (currentOperation == "*") {
        result.innerText = multiply(numbers[0], numbers[1]);
      }
      if (currentOperation == "/" && numbers[1] != 0) {
        if (numbers[1] != 0) {
          result.innerText = divide(numbers[0], numbers[1]);
        }
      }
      if (currentOperation == "^") {
        result.innerText = power(numbers[0], numbers[1]);
      }
    } else {
      if (result.innerText.charAt(result.innerText.length - 1) == "√") {
        let number = result.innerText.split(currentOperation);
        result.innerText = squareRoot(number[0]);
      }
    }
  }
};

const insertNumber = (event) => {
  if (result.innerText == 0) {
    result.innerText = event.target.name;
  } else {
    result.innerText += event.target.name;
  }
};

const insertOperation = (event) => {
  if (
    !result.innerText.includes("+") &&
    !result.innerText.includes("-") &&
    !result.innerText.includes("*") &&
    !result.innerText.includes("/") &&
    !result.innerText.includes("^") &&
    !result.innerText.includes("√") &&
    result.innerText != 0
  ) {
    result.innerText += event.target.name;
    currentOperation = event.target.name;
  }
};

const clearResult = () => {
  result.innerText = 0;
};

const deleteLastValue = () => {
  if (result.innerText != 0) {
    let newResult = result.innerText.substring(0, result.innerText.length - 1);
    result.innerHTML = newResult;
    if (result.innerText.length == 0) {
      result.innerText = 0;
    }
  }
};

const addListeners = () => {
  const operationBtns = document.querySelectorAll(".operation");
  const numberBtns = document.querySelectorAll(".number");
  const deleteBtn = document.getElementById("delete");
  const ceBtn = document.getElementById("CE");
  const equals = document.getElementById("equals");

  numberBtns.forEach((btn) => {
    btn.addEventListener("click", insertNumber);
    console.log("entra");
  });
  operationBtns.forEach((btn) => {
    btn.addEventListener("click", insertOperation);
  });

  deleteBtn.addEventListener("click", deleteLastValue);
  ceBtn.addEventListener("click", clearResult);
  equals.addEventListener("click", calc);
};

addListeners();
