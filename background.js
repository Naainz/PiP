chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked. Tab URL:", tab.url);
  
    const supportedSites = ["youtube.com", "netflix.com", "disneyplus.com", "hulu.com", "amazon.com", "primevideo.com", "vimeo.com", "dailymotion.com", "twitch.tv", "hbomax.com", "crunchyroll.com", "funimation.com", "peacocktv.com", "paramountplus.com", "apple.com", "tv.apple.com", "bbc.co.uk", "bbc.com", "player.bbc.com", "itv.com", "channel4.com", "skysports.com", "nbc.com", "nbcsports.com", "cbs.com", "espn.com", "fox.com", "abc.com", "cnn.com", "msn.com", "msnbc.com", "washingtonpost.com", "nytimes.com", "dailymail.co.uk", "forbes.com", "bloomberg.com", "financialtimes.com", "reuters.com", "theguardian.com", "latimes.com", "wsj.com", "nbcnews.com", "usatoday.com", "news.com.au", "yahoo.com", "vice.com", "theverge.com", "vox.com", "rottentomatoes.com", "imdb.com", "metacritic.com", "gamespot.com", "ign.com", "polygon.com", "crackle.com", "pluto.tv", "tubitv.com", "pandora.com", "spotify.com", "soundcloud.com", "bandcamp.com", "vevo.com", "tidal.com", "vudu.com", "starz.com", "showtime.com", "hbo.com", "fandango.com", "amctheatres.com"];
    
    if (tab.url && isSupportedSite(tab.url, supportedSites)) {
      console.log("Supported site detected. Toggling PiP...");
  
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePiPMode
      }).catch(err => console.error("Script execution failed:", err));
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
  
  function togglePiPMode() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture()
        .then(() => {
          console.log("Exited PiP mode.");
        })
        .catch(err => {
          console.error("Failed to exit PiP mode:", err);
        });
    } else {
      const video = document.querySelector('video');
      if (video) {
        video.requestPictureInPicture()
          .then(() => {
            console.log("Entered PiP mode.");
          })
          .catch(err => {
            console.error("Failed to enter PiP mode:", err);
          });
      } else {
        console.error("No video element found.");
      }
    }
  }
  