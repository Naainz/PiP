document.addEventListener('DOMContentLoaded', () => {
    const pipButton = document.getElementById('pipButton');
    const message = document.getElementById('message');
    const status = document.getElementById('status');
  
    
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      let tab = tabs[0];
      const supportedSites = ["youtube.com", "disneyplus.com", "netflix.com"];
      let url = new URL(tab.url);
      let domain = url.hostname;
  
      
      chrome.storage.local.get('seenMessage', (result) => {
        if (result.seenMessage) {
          
          handlePiPToggle(tab, supportedSites, domain, status);
        } else {
          
          message.style.display = 'block';
          pipButton.style.display = 'block';
  
          pipButton.addEventListener('click', () => {
            
            chrome.storage.local.set({ 'seenMessage': true });
  
            
            message.style.display = 'none';
            pipButton.style.display = 'none';
  
            
            handlePiPToggle(tab, supportedSites, domain, status);
          });
        }
      });
    });
  });
  
  function handlePiPToggle(tab, supportedSites, domain, status) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: checkAndTogglePiP,
      args: [supportedSites, domain]
    }, (results) => {
      if (results && results[0] && results[0].result === "pipClosed") {
        status.innerText = "PiP mode has been disabled.";
      } else if (results && results[0] && results[0].result === "pipOpened") {
        status.innerText = "PiP mode is enabled.";
      } else {
        status.innerText = "Site not supported for PiP.";
      }
    });
  }
  
  function checkAndTogglePiP(supportedSites, domain) {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      return "pipClosed";
    } else if (supportedSites.some(site => domain.includes(site))) {
      let video = document.querySelector('video');
      if (video) {
        video.requestPictureInPicture();
        return "pipOpened";
      } else {
        alert('No video found on this page.');
      }
    }
    return "unsupportedSite";
  }
  