console.log('application.js')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('GETTING TEXT')
  var textToAnalyze = window.getSelection().toString();
  var parentNode = window.getSelection().anchorNode.parentNode;
  // Ajax call to send to text to API
  sendResponse({text:textToAnalyze, parentNode:parentNode});
  return true;
});
