import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let countdownInterval;
let selectedDate;

// Convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function to format time units with leading zeros
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Function to update the countdown timer
function updateCountdownTimer(targetDate) {
  const currentDate = new Date().getTime();
  const timeRemaining = targetDate - currentDate;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    document.querySelector('[data-days]').textContent = '00';
    document.querySelector('[data-hours]').textContent = '00';
    document.querySelector('[data-minutes]').textContent = '00';
    document.querySelector('[data-seconds]').textContent = '00';
    Notiflix.Notify.success('Countdown has ended.');
    document.querySelector('#datetime-picker').disabled = false; // Enable input
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Disable the start button on page load
  document.querySelector('[data-start]').disabled = true;

// Initialize flatpickr
  const flatpickrInstance = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0].getTime();
      const currentDate = new Date().getTime();

      if (selectedDate <= currentDate) {
        flatpickrInstance.clear();
        Notiflix.Notify.failure('Please choose a date in the future');
        document.querySelector('[data-start]').disabled = true; // Disable Start button
      } else {
        document.querySelector('[data-start]').disabled = false; // Enable Start button
      }
    },
  });

  document.querySelector('[data-start]').addEventListener('click', () => {
    // Disable the start button and input when the timer starts
    document.querySelector('[data-start]').disabled = true;
    document.querySelector('#datetime-picker').disabled = true;

    updateCountdownTimer(selectedDate);
    countdownInterval = setInterval(() => {
      updateCountdownTimer(selectedDate);
    }, 1000);
  });
});