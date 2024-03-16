let screen = document.getElementById("screen");
let buttons = document.querySelectorAll("button");
let btnNumbers = document.querySelectorAll("#numb");
let deleBtn = document.getElementById("dele");
let oprBtns = document.querySelectorAll("#opr");
let dot = document.getElementById("dot");
let equalbtn = document.getElementById("equal");
let resetbtn = document.getElementById("reset");

let currentNumber = "";
let operator = "";
let previousNumber = "";

btnNumbers.forEach((btnNumber) => {
  btnNumber.addEventListener("click", (e) => {
    currentNumber += e.currentTarget.dataset.num;
    screen.innerText = Number(currentNumber).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  });
});

deleBtn.addEventListener("click", () => {
  currentNumber = currentNumber.slice(0, -1);
  screen.innerText = Number(currentNumber).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
});

oprBtns.forEach((oprBtn) => {
  oprBtn.addEventListener("click", (e) => {
    if (currentNumber === "") return;
    operator = e.currentTarget.dataset.operator;
    previousNumber = currentNumber;
    currentNumber = "";
  });
});

dot.addEventListener("click", () => {
  if (currentNumber === "") {
    currentNumber = "0.";
  } else if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }
  screen.innerText = currentNumber;
});

resetbtn.addEventListener("click", () => {
  screen.textContent = "0";
  currentNumber = "";
  previousNumber = "";
  operator = "";
});

equalbtn.addEventListener("click", () => {
  if (currentNumber === "" || operator === "") return;
  let result;
  try {
    result = eval(`${previousNumber} ${operator} ${currentNumber}`);
    if (!isFinite(result)) {
      throw new Error("Invalid");
    }
    screen.innerText = result.toLocaleString();
    currentNumber = result;
    previousNumber = "";
    operator = "";
  } catch (error) {
    screen.innerText = "Error";
  }
});

const themeMode = (themeOne, themeTwo, themeThree) => {
  const body = document.body;
  const rangeValue = Number(range.value);
  console.log(rangeValue);
  body.classList.remove(themeOne, themeTwo, themeThree);
  switch (rangeValue) {
    case 1:
      body.classList.add(themeOne);
      break;
    case 2:
      body.classList.add(themeTwo);
      break;
    case 3:
      body.classList.add(themeThree);
  }
};

const handleButtonActive = (event) => {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  event.target.classList.add("active");
};

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonActive);
});
