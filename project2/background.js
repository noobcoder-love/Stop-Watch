let startTime = 0;
let elapsedTime = 0;
let timerInterval;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "start") {
    if (!timerInterval) {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(updateTime, 1000);
    }
  } else if (request.command === "stop") {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  } else if (request.command === "reset") {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    startTime = 0;
    elapsedTime = 0;
    chrome.storage.local.set({ elapsedTime });
    chrome.runtime.sendMessage({ elapsedTime: 0 });
  } else if (request.command === "getTime") {
    sendResponse({ elapsedTime });
  }
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  chrome.storage.local.set({ elapsedTime });
  chrome.runtime.sendMessage({ elapsedTime });
}
