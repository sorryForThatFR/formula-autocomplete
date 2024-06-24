import { ALLOWED_OPERATORS_OPTIONS } from "./constants";

function getUniqueObjects(arr) {
  const seenValues = new Set();
  return arr.filter((item) => {
    if (!seenValues.has(item.value)) {
      seenValues.add(item.value);
      return true;
    }
    return false;
  });
}

export const formatOptions = (data) => {
  return getUniqueObjects(
    data.map((el) => ({
      label: el.name,
      value: el.value,
      id: el.data,
    }))
  );
};

export function evaluateExpression(expression) {
  const operators = {
    "/": (a, b) => a / b,
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
    "^": (a, b) => Math.pow(a, b),
    "-": (a, b) => a - b,
  };

  const precedence = {
    "^": 3,
    "/": 2,
    "-": 1,
    "*": 2,
    "+": 1,
  };

  const associativity = {
    "^": "R",
    "+": "L",
    "/": "L",
    "*": "L",
    "-": "L",
  };

  function isValidExpression(expression) {
    let parenthesesBalance = 0;
    let previousToken = "";
    const tokens = expression.match(/(\d+|\+|-|\*|\/|\^|\(|\))/g) ?? [];

    if (!tokens) {
      return false;
    }

    for (let token of tokens) {
      if (token === "(") {
        parenthesesBalance++;
      } else if (token === ")") {
        parenthesesBalance--;
        if (parenthesesBalance < 0) {
          return false; // More closing parentheses than opening
        }
      } else if (operators[token]) {
        if (
          operators[previousToken] ||
          previousToken === "" ||
          previousToken === "("
        ) {
          return false; // Two consecutive operators or starting with an operator
        }
      }
      previousToken = token;
    }
    return (
      parenthesesBalance === 0 &&
      !operators[previousToken] &&
      previousToken !== "("
    );
  }

  if (!isValidExpression(expression)) {
    return "ERROR";
  }

  const outputQueue = [];
  const operatorStack = [];
  const tokens = expression.match(/(\d+|\+|-|\*|\/|\^|\(|\))/g) ?? [];

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      outputQueue.push(Number(token));
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop(); // Remove the '(' from stack
    } else if (operators[token]) {
      while (
        operatorStack.length &&
        ((associativity[token] === "L" &&
          precedence[operatorStack[operatorStack.length - 1]] >=
            precedence[token]) ||
          (associativity[token] === "R" &&
            precedence[operatorStack[operatorStack.length - 1]] >
              precedence[token]))
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  });

  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop());
  }

  const stack = [];
  outputQueue.forEach((token) => {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    }
  });

  return stack[0];
}

export const getExpressionString = (tokens) => {
  return tokens.reduce((acc, next) => {
    acc += next.value;
    return acc;
  }, "");
};

export const getGroupOptions = (options) => {
  return [
    {
      label: "Operators",
      options: ALLOWED_OPERATORS_OPTIONS,
    },
    {
      label: "Values",
      options: options,
    },
  ];
};
