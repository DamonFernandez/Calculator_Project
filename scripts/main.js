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
    case "√":
      return Math.sqrt(operandOne);
    default:
      console.log("Invalid Operation Type");
      return "Invalid Operation Type";
  }
};

let rebuildCalcArray = (index, valueToAdd) => {
  calcArray.splice(index, 3, valueToAdd);
};
// So the way to do this is have 1 big algorithm go over the calcString and execute operations as needed,
// but the challenge is making it efficent and following order of operations

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
  if (symbolTwoToCheckFor != "√" && symbolOneToCheckFor != "√") {
    for (let i = 0; i < calcArray.length; i++) {
      if (
        calcArray[i] == symbolOneToCheckFor ||
        calcArray[i] == symbolTwoToCheckFor
      ) {
        resultOfOperation = performOperation(
          calcArray[i],
          calcArray[i - 1],
          calcArray[i + 1]
        );
        rebuildCalcArray(calcArray[i], resultOfOperation);
      }
    }
  } else if (symbolTwoToCheckFor == "√" || symbolOneToCheckFor == "√") {
    for (let i = 0; i < calcArray.length; i++) {
      if (calcArray[i] == "^") {
        resultOfOperation = performOperation(
          calcArray[i],
          calcArray[i - 1],
          calcArray[i + 1]
        );
        rebuildCalcArray(i, valueToAdd);
      } else if (calcArray[i] == "√") {
        resultOfOperation = performOperation(i, calcArray[i + 1]);
        rebuildCalcArray(calcArray[i], resultOfOperation);
      }
    }
  }
};

let executeCalc = () => {
  let resultOfOperation = 0;
  // So we just do this in layers like how a human would

  convertCalcArrayToNumbers();

  // Square root and exponents check
  bedmasLayerExecute("√", "^");

  // Multiplication and division check
  bedmasLayerExecute("*", "/");

  // Addition and subtraction check
  bedmasLayerExecute("+", "-");

  calcString = calcArray.toString();
  renderCalcString();
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
    calcArray[index] == "^" ||
    calcArray[index] == "√"
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
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += ` ${symbol} `;
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = symbol;
    }
  });
};

let addEventHandlerToNumberButton = (buttonId, symbol) => {
  // displayingOutput ? clearCalcString() : null;
  document.getElementById(buttonId).addEventListener("click", () => {
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
  addEventHandlerToOperationButton("squareRootButton", "√");
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

//Global Vars:

let calcArray = [];
let calcArrayIndex = 0;
let calcString = "";
let calcOutputWindow = document.getElementsByTagName("output")[0];

addEventHandlers();

// Bug: cant handle multiple operators yet
