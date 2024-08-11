document.addEventListener('DOMContentLoaded', async () => {
    const pipButton = document.getElementById('pipButton');
    const message = document.getElementById('message');
    const status = document.getElementById('status');
  
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const supportedSites = ["youtube.com", "disneyplus.com", "netflix.com"];
    let url = new URL(tab.url);
    let domain = url.hostname;
  
    
    if (document.pictureInPictureElement) {
      status.innerText = "PiP mode is currently active.";
      message.style.display = 'none';
      pipButton.innerText = "Disable PiP";
  
      pipButton.addEventListener('click', async () => {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
          status.innerText = "PiP mode has been disabled.";
          pipButton.innerText = "Enable PiP";
        }
      });
    } else {
      
      chrome.storage.local.get('seenMessage', async (result) => {
        if (result.seenMessage) {
          
          message.style.display = 'none';
          pipButton.style.display = 'none';
  
          if (supportedSites.some(site => domain.includes(site))) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: enablePiP
            });
            status.innerText = 'PiP mode is enabled.';
          } else {
            status.innerText = "Site not supported for PiP.";
          }
        } else {
          
          message.style.display = 'block';
          pipButton.style.display = 'block';
  
          pipButton.addEventListener('click', async () => {
            
            chrome.storage.local.set({ 'seenMessage': true });
  
            if (supportedSites.some(site => domain.includes(site))) {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: enablePiP
              });
              message.style.display = 'none';
              pipButton.style.display = 'none';
              status.innerText = 'PiP mode is enabled.';
            } else {
              status.innerText = "Site not supported for PiP.";
            }
          });
        }
      });
    }
  });
  
  function enablePiP() {
    let video = document.querySelector('video');
    if (video) {
      video.requestPictureInPicture();
    } else {
      alert('No video found on this page.');
    }
  }
  