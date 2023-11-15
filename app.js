const input = document.querySelector(".input");
const result = document.querySelector(".result");
const backspace = document.querySelector(".backspace");
const keys = document.querySelectorAll(".keypad span");

let statement = "";
let answer;
let isdecimal = false;
const operators = ["+", "-", "x", "÷", "%", "00"];

function handleKeyPress(e) {
  const key = e.target.dataset.key;
  const lastChar = statement[statement.length - 1];

  if (key === "=") {
    return;
  }

  if (key) {
    if (key === ".") {
      isdecimal = true;
    }
    statement += key;
    input.innerHTML = statement;
    return;
  }
}

function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = statement[statement.length - 1];

  const finalstatement = statement
    .replace(/x/g, "*")
    .replace(/÷/g, "/")
    .replace(/%/g, "/100");
  answer = eval(finalstatement).toFixed(6);

  if (key === "=") {
    isdecimal = false;
    statement = `${answer}`;
    answer = "";
    input.innerHTML = statement;
    result.innerHTML = answer;
    return;
  }
  result.innerHTML = answer;
}

function clearInput(e) {
  statement = statement.slice(0, -1);
  input.innerHTML = statement;
}

document.getElementById("reload").addEventListener("click", function (e) {
  location.reload();
});
backspace.addEventListener("click", clearInput);

keys.forEach((key) => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});
