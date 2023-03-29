import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const inputDateTimePickerEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerEl = document.querySelector(".timer")
timerEl.style.color = "green";
timerEl.style.display = "flex";
timerEl.style.gap = "10px";


startBtn.disabled = true;

let deltaTime = 0;
let timerId = null;
let formatDate = null;
const DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDeltaDate(selectedDates[0]);
  },
};

startBtn.addEventListener('click', onBtnStart);
flatpickr(inputDateTimePickerEl, options);

function onBtnStart() {
  timerId = setInterval(startTimer, DELAY);
}

function startTimer() {
  startBtn.disabled = true;
  inputDateTimePickerEl.setAttribute('disabled', true);
  deltaTime -= 1000;

  if (secondsEl.textContent <= 0 && minutesEl.textContent <= 0) {
    Notify.success('Time over');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(deltaTime);
    convertDate(formatDate);
  }
}

function currentDeltaDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    startBtn.disabled = true;
    return Notify.failure('Please choose a date in the future');
  }

  deltaTime = selectedDates.getTime() - currentDate;
  formatDate = convertMs(deltaTime);

 	convertDate(formatDate);
   startBtn.disabled = false;
}

function convertDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
}

function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
