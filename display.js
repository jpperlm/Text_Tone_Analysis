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
    var replacementText='<bolded>'.concat(keyPhrases[i]).concat('</bolded>');
    text = text.replace(keyPhrases[i], replacementText);
  }
  $('#container').html(text);
  colorObjectLiteral={
    25:"Red",
    50:"Grey",
    75:"Blue",
    100:"Green"
  }
  var barColor;
  var barTitle;
  var percent = Math.round(data.sentiment.documents[0].score * 100.0);
    if (percent<25){
      barColor="red";
      barTitle="Negative Sentiment";
    }
    else if (percent>25 && percent<75) {
      barColor="grey"
      barTitle="Neutral Sentiment";
    }
    else{
      barColor="green"
      barTitle="Postive Sentiment";

    }
    barTitle += " ("+percent+"%)"
  var x = ('<div class="progress"><div class="barLabel">'+barTitle+'</div>\
      <div class="determinate '+barColor+'" style="width:'+ percent + '%"></div>\
  </div>')
  $('#barContainer').html(x);
}
