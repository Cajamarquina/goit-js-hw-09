import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

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
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
      }
    }

    // Initialize flatpickr
    const flatpickrInstance = flatpickr('#datetime-picker', {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selectedDate = selectedDates[0].getTime();
        const currentDate = new Date().getTime();

        if (selectedDate <= currentDate) {
          flatpickrInstance.clear();
          Notiflix.Notify.warning('Please choose a date in the future');
          document.querySelector('[data-start]').disabled = true;
        } else {
          document.querySelector('[data-start]').disabled = false;
          document.querySelector('#datetime-picker').addEventListener('click', () => {
            flatpickrInstance.open();
          });

          document.querySelector('[data-start]').addEventListener('click', () => {
            updateCountdownTimer(selectedDate);
            countdownInterval = setInterval(() => {
              updateCountdownTimer(selectedDate);
            }, 1000);
          });
        }
      },
    });
