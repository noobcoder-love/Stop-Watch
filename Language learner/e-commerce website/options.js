document.getElementById('applyDarkTheme').addEventListener('click', () => {
  chrome.storage.sync.set({ theme: 'dark' }, () => {
    applyTheme('dark');
  });
});

document.getElementById('applyLightTheme').addEventListener('click', () => {
  chrome.storage.sync.set({ theme: 'light' }, () => {
    applyTheme('light');
  });
});

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#fff';
  } else {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  }
}

chrome.storage.sync.get(['theme'], (result) => {
  applyTheme(result.theme || 'light');
});
