const result = document.body.querySelector("#result");
const equals = document.body.querySelector(".eq__key");
const decimal = document.body.querySelector('.op__key[op="decimal"]');

document.querySelectorAll(".num__key").forEach((el) => {
  el.onclick = () => {
    result.value =
      result.value !== "0" ? result.value + el.innerText : el.innerText;
  };
});
const operator = ["add", "subtract", "multiply", "divide", "percent"];
const buffer = [];

const evaluate = (buffer) => {
  const secondVal = buffer.pop();
  const operators = buffer.pop();
  const firstVal = buffer.pop();
  switch (operators) {
    case "add":
      return firstVal + secondVal;
      break;
    case "subtract":
      return firstVal - secondVal;
      break;
    case "multiply":
      return firstVal * secondVal;
      break;
    case "divide":
      return firstVal / secondVal;
      break;
    default:
      return secondVal;
  }
};

const operatorProcess = (type) => {
  let currentValue = parseFloat(result.value);
  if (type == "percent") {
    result.value = currentValue / 100;
  } else {
    if (buffer.length !== 0) {
      buffer.push(parseFloat(result.value));
      const final = evaluate(buffer);
      buffer.push(final);
      buffer.push(type);
      result.value = 0;
    } else {
      buffer.push(currentValue);
      buffer.push(type);
      result.value = 0;
    }
  }
};

operator.map((val) => {
  document.querySelector(`.op__key[op=${val}]`).onclick = () =>
    operatorProcess(val);
});

document.querySelector('.op__key[op="clear"]').onclick = () => {
  result.value = 0;
};

document.querySelector('.op__key[op="negative"]').onclick = () => {
  result.value = result.value == 0 ? 0 : -1 * parseFloat(result.value);
};

decimal.addEventListener("click", () => {
  result.value = `${result.value}.0`;
});

equals.onclick = () => {
  if (buffer.length !== 0) {
    buffer.push(parseFloat(result.value));
  }
  result.value = evaluate(buffer);
};
