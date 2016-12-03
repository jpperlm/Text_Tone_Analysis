function getApiKey()
{
  return "YOUR API KEY HERE"
}

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
        if(response["error"]==""){
          makeCall(response['text'], response['parentNode'], response['textHTML']);
        }
        else {
          alert("Selected text was too long. Please make a smaller selection.")
        }
      });
    } else { // No listener on the other end
      chrome.tabs.executeScript(tabId, {file: "application.js"}, function(){
        if(chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          throw Error("Unable to inject script into tab " + tabId);
        }
        // OK, now it's injected and ready
        chrome.tabs.sendMessage(tabId, message, function(response){
          if(response["error"]==""){
            makeCall(response['text'], response['parentNode'], response['textHTML']);
          }
          else {
            alert("Selected text was too long. Please make a smaller selection.")
          }
        });
      });
    }
  });
};


function makeCall(text, parent, textHTML){
  var plainText = text;
  var parentNode = parent;
  var textHTML = textHTML;
  var params ={
    "documents": [{
    "language": "en",
     "id": "1",
     "text": plainText
    }]};
  var sentiment_object;
  var keyPhrases_object;
  $.ajax({
    url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param( params ),
    beforeSend: function(xhrObj){
    // Request headers
    xhrObj.setRequestHeader("Content-Type","application/json");
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getApiKey());
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
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getApiKey());
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
      console.log(data);
  });
  function waitForElement(){
      if(sentiment_object && keyPhrases_object){
        var message = {sentiment: sentiment_object, keyPhrases: keyPhrases_object, text: plainText, textHTML: textHTML};
        // sends code to create new chrome tab with all information compiled

        createPage(message);

        //If i want to update dom on page, do i have to send code back to application.js or can i do it from here?

        //Send final RESPONSE back to application.js
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          //   injectOriginalPage(tabs[0].id, message);
          // });


      }
      else{
          setTimeout(function(){
              waitForElement();
          },500);
      }
  }
  waitForElement();
}
// function injectOriginalPage(tabId, message){
//   message['textHTML']= parseHTML(message);
//   chrome.tabs.sendMessage(tabId, message, function(response){
//
//   });
// }
//
// function parseHTML(data){
//   var keyPhrases = data.keyPhrases.documents[0].keyPhrases;
//   var textHTML = data.textHTML;
//   for(var i=0;i<keyPhrases.length;i++)
//   {
//     var replacementText='<bolded>'.concat(keyPhrases[i]).concat('</bolded>');
//     textHTML.replace(/(keyPhrases[i])(?![^<]*>|[^<>]*<\/)/, replacementText);
//   }
//   return textHTML;
// }



function createPage(params)
{
  //Create New Chrome Tab
  chrome.tabs.create({"url": 'response.html'}, function(tab){
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
