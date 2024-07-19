let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
    startButton.disabled = true;
    stopButton.disabled = false;
  }
}

function stopTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  timeDisplay.innerHTML = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
