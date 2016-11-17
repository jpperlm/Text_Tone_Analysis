chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Extension Clicked')
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      ensureSendMessage(tabs[0].id, {greeting: "hello"});
    });
  });


function ensureSendMessage(tabId, message, callback){
  chrome.tabs.sendMessage(tabId, {ping: true}, function(response){
    if(response) { // Content script ready
      chrome.tabs.sendMessage(tabId, message, function(response){
        makeCall(response['text'], response['parentNode']);
      });
    } else { // No listener on the other end
      chrome.tabs.executeScript(tabId, {file: "application.js"}, function(){
        if(chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          throw Error("Unable to inject script into tab " + tabId);
        }
        // OK, now it's injected and ready
        chrome.tabs.sendMessage(tabId, message, function(response){
          makeCall(response['text'], response['parentNode']);
        });
      });
    }
  });
};


function makeCall(text, parent){
  var textToAnalyze = text;
  var parentNode = parent;
  var params ={
    "documents": [{
    "language": "en",
     "id": "1",
     "text": textToAnalyze
    }]};
  var sentiment_object;
  var keyPhrases_object;
  $.ajax({
    url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param( params ),
    beforeSend: function(xhrObj){
    // Request headers
    xhrObj.setRequestHeader("Content-Type","application/json");
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","98606b9680ac40d19fc4e4e6d0746715");
    xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    // Request body
    data: JSON.stringify(params)
    })
    .done(function(data) {
      //sentiment data being returned here
      //num from 0-1
      sentiment_object = data;
      console.log(data);

  });
  $.ajax({
    url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" + $.param( params ),
    beforeSend: function(xhrObj){
    // Request headers
    xhrObj.setRequestHeader("Content-Type","application/json");
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","98606b9680ac40d19fc4e4e6d0746715");
    xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    // Request body
    data: JSON.stringify(params)
    })
    .done(function(data) {
      //key phrase data being returned here
      //array of strings
      keyPhrases_object = data;
      console.log(data)
  });
  function waitForElement(){
      if(sentiment_object && keyPhrases_object){
        var message = {sentiment: sentiment_object, keyPhrases: keyPhrases_object, text: textToAnalyze};
        createPage(message);
      }
      else{
          setTimeout(function(){
              waitForElement();
          },500);
      }
  }
  waitForElement();
}



function createPage(params)
{
  //Create New Chrome Tab
  chrome.tabs.create({"url": chrome.extension.getURL('response.html')}, function(tab){
    //Wait for tab to be fully loaded before doing anything
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status == 'complete') {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tab.id, params)
          })
        }
      })
    })
}
