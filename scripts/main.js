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
    if (!currentArrayIndexIsOperator) {
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
        rebuildCalcArray(i, resultOfOperation);
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
        rebuildCalcArray(i, resultOfOperation);
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
  renderCalcString;
};
let renderCalcOutput = () => {
  let output = executeCalc(getCalcString);
  calcOutputWindow.textContent = output;
};

let renderCalcString = () => {
  calcOutputWindow.textContent = calcString;
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

let addEventHandlers = () => {
  document.getElementById("addButton").addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += " + ";
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = "+";
    }
  });

  document.getElementById("subtractButton").addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += " - ";
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = "-";
    }
  });

  document.getElementById("multiplyButton").addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += " * ";
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = "*";
    }
  });

  document.getElementById("divideButton").addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += " / ";
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = "/";
    }
  });

  document.getElementById("exponentButton").addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += " ^ ";
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = "^";
    }
  });

  document.getElementById("squareRootButton").addEventListener("click", () => {
    if (
      (calcArrayIndex != 0 ||
        typeof calcArray[calcArrayIndex] != "undefined") &&
      !currentArrayIndexIsOperator(calcArrayIndex)
    ) {
      calcString += " √ ";
      renderCalcString();
      calcArrayIndex++;
      calcArray[calcArrayIndex] = "√";
    }
  });
  document.getElementById("executeButton").addEventListener("click", () => {
    executeCalc();
  });

  document.getElementById("zeroButton").addEventListener("click", () => {
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
      calcString += "0";
      renderCalcString();
      calcArray[calcArrayIndex] += "0";
    }
  });

  document.getElementById("oneButton").addEventListener("click", () => {
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
      calcString += "1";
      renderCalcString();
      calcArray[calcArrayIndex] += "1";
    }
  });

  document.getElementById("twoButton").addEventListener("click", () => {
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
      calcString += "2";
      renderCalcString();
      calcArray[calcArrayIndex] += "2";
    }
  });

  document.getElementById("threeButton").addEventListener("click", () => {
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
      calcString += "3";
      renderCalcString();
      calcArray[calcArrayIndex] += "3";
    }
  });

  document.getElementById("fourButton").addEventListener("click", () => {
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
      calcString += "4";
      renderCalcString();
      calcArray[calcArrayIndex] += "4";
    }
  });

  document.getElementById("fiveButton").addEventListener("click", () => {
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
      calcString += "5";
      renderCalcString();
      calcArray[calcArrayIndex] += "5";
    }
  });

  document.getElementById("sixButton").addEventListener("click", () => {
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
      calcString += "6";
      renderCalcString();
      calcArray[calcArrayIndex] += "6";
    }
  });

  document.getElementById("sevenButton").addEventListener("click", () => {
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
      calcString += "7";
      renderCalcString();
      calcArray[calcArrayIndex] += "7";
    }
  });

  document.getElementById("eightButton").addEventListener("click", () => {
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
      calcString += "8";
      renderCalcString();
      calcArray[calcArrayIndex] += "8";
    }
  });

  document.getElementById("nineButton").addEventListener("click", () => {
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
      calcString += "9";
      renderCalcString();
      calcArray[calcArrayIndex] += "9";
    }
  });
};

// Global:

//Global Vars:

let calcArray = [];
let calcArrayIndex = 0;
let calcString = "";
let calcOutputWindow = document.getElementsByTagName("output")[0];

addEventHandlers();
