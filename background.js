chrome.action.onClicked.addListener(async (tab) => {
    
    chrome.storage.local.set({ activatePiP: true });
    checkAndTogglePiP(tab);
  });
  
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    let tab = await chrome.tabs.get(activeInfo.tabId);
    chrome.storage.local.get('activatePiP', (result) => {
      if (result.activatePiP) {
        checkAndTogglePiP(tab);
      }
    });
  });
  
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.storage.local.get('activatePiP', (result) => {
        if (result.activatePiP) {
          checkAndTogglePiP(tab);
        }
      });
    }
  });
  
  function checkAndTogglePiP(tab) {
    const supportedSites = ["youtube.com", "disneyplus.com", "netflix.com"];
    let url = new URL(tab.url);
    let domain = url.hostname;
  
    if (supportedSites.some(site => domain.includes(site))) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePiPMode
      });
    }
  }
  
  function togglePiPMode() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      chrome.storage.local.set({ activatePiP: false }); 
    } else {
      let video = document.querySelector('video');
      if (video) {
        video.requestPictureInPicture();
        chrome.storage.local.set({ activatePiP: false }); 
      } else {
        alert('No video found on this page.');
      }
    }
  }
  