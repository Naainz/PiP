chrome.action.onClicked.addListener(async (tab) => {
    const supportedSites = ["youtube.com", "disneyplus.com", "netflix.com"];
  
    
    if (tab.url && isSupportedSite(tab.url, supportedSites)) {
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePiPMode
      });
    } else {
      console.log("This site is not supported for PiP.");
    }
  });
  
  
  function isSupportedSite(url, supportedSites) {
    let domain;
    try {
      domain = new URL(url).hostname;
    } catch (e) {
      console.error("Invalid URL:", e);
      return false;
    }
    return supportedSites.some(site => domain.includes(site));
  }
  
  
  function togglePiPMode() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      const video = document.querySelector('video');
      if (video) {
        video.requestPictureInPicture().catch(error => {
          console.error("Failed to enter PiP mode:", error);
        });
      } else {
        alert("No video element found to activate PiP.");
      }
    }
  }
  