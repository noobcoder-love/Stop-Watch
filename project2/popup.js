const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => sendCommand('start'));
stopButton.addEventListener('click', () => sendCommand('stop'));
resetButton.addEventListener('click', () => sendCommand('reset'));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.elapsedTime !== undefined) {
    displayTime(request.elapsedTime);
  }
});

function sendCommand(command) {
  chrome.runtime.sendMessage({ command });
  if (command === 'start') {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
  } else if (command === 'stop') {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
  } else if (command === 'reset') {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    timeDisplay.innerText = '00:00:00';
  }
}

function displayTime(elapsedTime) {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  timeDisplay.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

chrome.runtime.sendMessage({ command: 'getTime' }, (response) => {
  if (response.elapsedTime !== undefined) {
    displayTime(response.elapsedTime);
  }
});
