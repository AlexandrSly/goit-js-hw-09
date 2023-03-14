const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerEl;

startBtn.addEventListener('click', () => {
  timerEl = setInterval(() => {
    startBtn.disabled = true;
    bodyEl.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(timerEl);
});
