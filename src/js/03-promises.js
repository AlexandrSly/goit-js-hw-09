const inputFirstDelay = document.querySelectorAll('input[name="delay"]');
const inputDelayStep = document.querySelectorAll('input[name="step"]');
const inputAmount = document.querySelectorAll('input[name="amount"]');
const BtnCreate = document.querySelector('button[type="submit"]');
const form = document.querySelector('form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        console.log(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        console.log(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}

let count = 0;

BtnCreate.addEventListener('click', e => {
  e.preventDefault();
  const firstDelay = Number(inputFirstDelay[0].value);
  const delayStep = Number(inputDelayStep[0].value);
  const amount = Number(inputAmount[0].value);

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      createPromise(count, firstDelay + delayStep * i);
      count++;
    }, i * delayStep);
  }
  form.reset();
});
