import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const start = document.querySelector('[data-start]');
start.disabled = true;
const datetimePicker = document.querySelector('#datetime-picker');

const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        pauseOnHover: false,
        backgroundColor: '#EF4040',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
      });
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

start.addEventListener('click', handleClick);

function handleClick() {
  start.disabled = true;
  datetimePicker.disabled = true;

  const timer = setInterval(() => {
    let ms = userSelectedDate - Date.now();
    if (ms <= 0) {
      datetimePicker.disabled = false;
      clearInterval(timer);
      return;
    }

    let time = convertMs(ms);

    daysElem.innerHTML = addLeadingZero(time.days);
    hoursElem.innerHTML = addLeadingZero(time.hours);
    minutesElem.innerHTML = addLeadingZero(time.minutes);
    secondsElem.innerHTML = addLeadingZero(time.seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
