chrome.action.onClicked.addListener(async (tab) => {
    console.log("Extension icon clicked. Tab URL:", tab.url);  
  
    const supportedSites = ["youtube.com", "disneyplus.com", "netflix.com"];
  
    if (tab.url && isSupportedSite(tab.url, supportedSites)) {
      console.log("Supported site detected. URL:", tab.url);
  
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: checkPiPStatus
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error("Script execution error:", chrome.runtime.lastError);
        } else if (results && results[0]) {
          const isPiPActive = results[0].result;
          console.log("PiP status:", isPiPActive ? "Active" : "Inactive");
  
          if (isPiPActive) {
            console.log("Deactivating PiP mode...");
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: exitPiPMode
            });
          } else {
            console.log("Activating PiP mode...");
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: activatePiPMode
            });
          }
        } else {
          console.error("No results returned from script execution.");
        }
      });
    } else {
      console.log("This site is not supported for PiP. URL:", tab.url);
    }
  });
  
  
  function isSupportedSite(url, supportedSites) {
    try {
      let domain = new URL(url).hostname;
      console.log("Checking site:", domain);
      return supportedSites.some(site => domain.includes(site));
    } catch (e) {
      console.error("Invalid URL:", e);
      return false;
    }
  }
  
  
  function checkPiPStatus() {
    return !!document.pictureInPictureElement;
  }
  
  
  function activatePiPMode() {
    const video = document.querySelector('video');
    if (video) {
      video.requestPictureInPicture()
        .then(() => {
          console.log("PiP mode activated.");
        })
        .catch(error => {
          console.error("Failed to enter PiP mode:", error);
        });
    } else {
      alert("No video element found to activate PiP.");
    }
  }
  
  
  function exitPiPMode() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture()
        .then(() => {
          console.log("PiP mode deactivated.");
        })
        .catch(error => {
          console.error("Failed to exit PiP mode:", error);
        });
    }
  }
  