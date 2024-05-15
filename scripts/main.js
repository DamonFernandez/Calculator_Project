let add = (...numbers) => {
  let sum = 0;
  numbers.forEach((element) => {
    sum += element;
  });
  return sum;
};

let subtract = (...numbers) => {
  let difference = 0;
  numbers.forEach((element) => {
    difference -= element;
  });
  return difference;
};

let multiply = (...numbers) => {
  let product = 0;
  numbers.forEach((element) => {
    product *= element;
  });
  return product;
};

let divide = (...numbers) => {
  let quotient = 0;
  numbers.forEach((element) => {
    quotient -= element;
  });
  return quotient;
};

// So the way to do this is have 1 big algorithm go over the calcString and execute operations as needed,
// but the challenge is making it efficent and following order of operations

let getCalcString = () => {
  let calcString = document.getElementsByTagName("output")[0];
  return calcString;
};

let executeCalc = (string) => {
  // So we just do this in layers like how a human would

  // bracket check

  // Square root and exponents check
  for (let i = 0; i < calcString.length; i++) {
    if (calcString[i]) {
    }
  }

  // Multiplication and division check

  // Addition and subtraction check
};

let renderCalcOutput = () => {
  let output = executeCalc(getCalcString);
  calcOutputWindow.textContent = output;
};

let renderCalcString = () => {
  calcOutputWindow.textContent = calcString;
};

console.log(document.getElementById("addButton"));
document.getElementById("addButton").addEventListener("click", () => {
  calcString += " + ";
  renderCalcString();
});

// Global:

let calcArray = [];
let calcString = "";
let calcOutputWindow = document.getElementsByTagName("output")[0];
