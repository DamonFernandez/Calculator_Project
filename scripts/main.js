let performOperation = (operationType, operandOne = 0, operandTwo = 0) => {
  switch (operationType) {
    case "+":
      return operandOne + operandTwo;
    case "-":
      return operandOne - operandTwo;
    case "*":
      return operandOne * operandTwo;
    case "/":
      return operandOne / operandTwo;
    case "^":
      return operandOne ** operandTwo;
    default:
      console.log("Invalid Operation Type");
      return "Invalid Operation Type";
  }
};

let rebuildCalcArray = (index, valueToAdd) => {
  calcArray.splice(index - 1, 3, valueToAdd);
};

let getCalcString = () => {
  let calcString = document.getElementsByTagName("output")[0];
  return calcString;
};

let convertCalcArrayToNumbers = () => {
  for (let i = 0; i < calcArray.length; i++) {
    if (!currentArrayIndexIsOperator(i)) {
      calcArray[i] = Number(calcArray[i]);
    }
  }
};

let bedmasLayerExecute = (symbolOneToCheckFor, symbolTwoToCheckFor) => {
  for (let i = 0; i < calcArray.length; i++) {
    if (
      calcArray[i] == symbolOneToCheckFor ||
      calcArray[i] == symbolTwoToCheckFor
    ) {
      let resultOfOperation = performOperation(
        calcArray[i],
        calcArray[i - 1],
        calcArray[i + 1]
      );
      rebuildCalcArray(i, resultOfOperation);
      i = i - 1; // Adjust index after splice
    }
  }
};

let executeCalc = () => {
  convertCalcArrayToNumbers();

  // Exponents check
  bedmasLayerExecute("^", "^");

  // Multiplication and division check
  bedmasLayerExecute("*", "/");

  // Addition and subtraction check
  bedmasLayerExecute("+", "-");

  calcString = calcArray.join(" ");
  renderCalcString();
  outputDisplayed = true;
};

let renderCalcString = () => {
  calcOutputWindow.textContent = calcString;
};

let clearCalcString = () => {
  calcString = "";
};

let currentArrayIndexIsOperator = (index) => {
  if (
    calcArray[index] == "+" ||
    calcArray[index] == "-" ||
    calcArray[index] == "/" ||
    calcArray[index] == "*" ||
    calcArray[index] == "^"
  ) {
    return true;
  }
  return false;
};

let addEventHandlerToOperationButton = (buttonId, symbol) => {
  document.getElementById(buttonId).addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex) &&
      !outputDisplayed
    ) {
      calcString += ` ${symbol} `;
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = symbol;
      outputDisplayed = false;
    }
  });
};

let addEventHandlerToNumberButton = (buttonId, symbol) => {
  document.getElementById(buttonId).addEventListener("click", () => {
    if (outputDisplayed) {
      calcArray = [];
      calcArrayIndex = 0;
      calcString = "";
      outputDisplayed = false;
    }

    if (currentArrayIndexIsOperator(calcArrayIndex)) {
      calcArrayIndex++;
    }

    if (typeof calcArray[calcArrayIndex] == "undefined") {
      calcArray[calcArrayIndex] = "";
    }

    if (
      calcArray[calcArrayIndex] == "" ||
      !calcArray[calcArrayIndex].startsWith("0")
    ) {
      calcString += symbol;
      renderCalcString();
      calcArray[calcArrayIndex] += symbol;
    }
  });
};

let addEventHandlers = () => {
  addEventHandlerToOperationButton("addButton", "+");
  addEventHandlerToOperationButton("subtractButton", "-");
  addEventHandlerToOperationButton("multiplyButton", "*");
  addEventHandlerToOperationButton("divideButton", "/");
  addEventHandlerToOperationButton("exponentButton", "^");

  addEventHandlerToNumberButton("zeroButton", "0");
  addEventHandlerToNumberButton("oneButton", "1");
  addEventHandlerToNumberButton("twoButton", "2");
  addEventHandlerToNumberButton("threeButton", "3");
  addEventHandlerToNumberButton("fourButton", "4");
  addEventHandlerToNumberButton("fiveButton", "5");
  addEventHandlerToNumberButton("sixButton", "6");
  addEventHandlerToNumberButton("sevenButton", "7");
  addEventHandlerToNumberButton("eightButton", "8");
  addEventHandlerToNumberButton("nineButton", "9");

  document.getElementById("executeButton").addEventListener("click", () => {
    executeCalc();
  });
};

// Global:

// Global Vars:

let calcArray = [];
let calcArrayIndex = 0;
let calcString = "";
let calcOutputWindow = document.getElementsByTagName("output")[0];
let outputDisplayed = false;

addEventHandlers();
