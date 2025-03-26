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

module.exports = {
  stringToInt,
  sum,
  subtract,
  multiply,
  divide,
  power,
  squareRoot,
};
