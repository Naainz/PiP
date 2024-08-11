document.addEventListener('DOMContentLoaded', () => {
    const pipButton = document.getElementById('pipButton');
    const message = document.getElementById('message');
  
    chrome.storage.local.get('seenMessage', (result) => {
      if (result.seenMessage) {
        chrome.storage.local.set({ activatePiP: true });
        window.close(); 
      } else {
        message.style.display = 'block';
        pipButton.style.display = 'block';
  
        pipButton.addEventListener('click', () => {
          chrome.storage.local.set({ seenMessage: true, activatePiP: true });
          window.close(); 
        });
      }
    });
  });
  