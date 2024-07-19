chrome.commands.onCommand.addListener((command) => {
    if (command === "custom_shortcut") {
      chrome.tabs.create({ url: "https://www.example.com" });
    }
  });
  