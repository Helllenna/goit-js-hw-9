const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function changeBgColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function startChangeBgColor() {
  startBtn.disabled = true;
  intervalId = setInterval(changeBgColor, 1000);
}

function stopChangeBgColor() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}

startBtn.addEventListener('click', startChangeBgColor);
stopBtn.addEventListener('click', stopChangeBgColor);
