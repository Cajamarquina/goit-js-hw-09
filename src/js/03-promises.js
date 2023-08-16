import Notiflix from 'notiflix';

// Function to create a promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Function to handle form submission
document.getElementById("promise-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const firstDelay = parseInt(formData.get("delay"));
  const delayStep = parseInt(formData.get("step"));
  const amount = parseInt(formData.get("amount"));

  // Create and handle promises
  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * delayStep;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});