console.log('application.js')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('GETTING TEXT')
  var plainText = window.getSelection().toString();
  //Grabs the text with the html values
  var textHTML = getSelectionHtml();
  var parentNode = window.getSelection().anchorNode.parentNode;
  // Ajax call to send to text to API
  sendResponse({text:plainText, textHTML:textHTML, parentNode:parentNode});
  return true;
});

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}
