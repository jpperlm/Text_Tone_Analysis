console.log('display.js');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //Request holds the keyPhrases and the sentiment objects
  //Now have to implement displaying these objects
  doStuff(request);
  sendResponse({response:'response'});
  return true;
});;


function doStuff(data){
  var keyPhrases = data.keyPhrases.documents[0].keyPhrases;
  var text = data.text;
  for(var i=0;i<keyPhrases.length;i++)
  {
    var replacementText='<mark>'.concat(keyPhrases[i]).concat('</mark>');
    text = text.replace(keyPhrases[i], replacementText);
  }
  $('#container').append(text);

}
