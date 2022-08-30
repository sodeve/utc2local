let dt = new Date();

chrome.runtime.onInstalled.addListener(() => {
  let offset = dt.getTimezoneOffset();
  chrome.storage.sync.set({ options: { offset: offset } });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
});

function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url.startsWith("chrome")) {
    if (changeInfo.status === "complete") {
      chrome.storage.sync.get("options", (data) => {
        if (data.options.active) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: reddenPage
          });
        }
      });
    }
  }
});
