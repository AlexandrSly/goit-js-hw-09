import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input[type="text"]');
const btnStart = document.querySelector('button[data-start]');
const timerHtml = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputEl.value) - new Date();
    btnStart.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);

      daysEl.textContent = addLeadingZero(timeObject.days);
      hoursEl.textContent = addLeadingZero(timeObject.hours);
      minutesEl.textContent = addLeadingZero(timeObject.minutes);
      secondsEl.textContent = addLeadingZero(timeObject.seconds);

      if (countdown <= 10000) {
        timerHtml.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});
