console.log('display.js');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //Request holds the keyPhrases and the sentiment objects
  //Now have to implement displaying these objects
  console.log(request);
  sendResponse({response:'response'});
  return true;
});;
