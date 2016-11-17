console.log('display.js');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //Request holds the keyPhrases and the sentiment objects
  //Now have to implement displaying these objects
  doStuff(request);
  sendResponse({response:'response'});
  return true;
});;


function doStuff(data){
  console.log(data)
  var keyPhrases = data.keyPhrases.documents[0].keyPhrases;
  var text = data.text;
  for(var i=0;i<keyPhrases.length;i++)
  {
    var replacementText='<bolded>'.concat(keyPhrases[i]).concat('</bolded>');
    text = text.replace(keyPhrases[i], replacementText);
  }
  $('#container').append(text);
  colorObjectLiteral={
    25:"Red",
    50:"Grey",
    75:"Blue",
    100:"Green"
  }
  var barColor;
  var percent = Math.round(data.sentiment.documents[0].score * 100.0);
    if (percent<25){barColor="red"}
    else if (percent<50) {barColor="grey"}
    else if (percent<75) {barColor="blue"}
    else{barColor="green"}

  var x = ('<div class="progress">\
      <div class="determinate '+barColor+'" style="width:'+ percent + '%"></div>\
  </div>')
  $('#container').append(x);
}
