chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('GETTING TEXT')
  if(request['textHTML']){
    replaceSelectedText(request['textHTML']);
  }
  else{
    var plainText = window.getSelection().toString();
    var textHTML = getSelectionHtml();
    var parentNode = window.getSelection().anchorNode;

    if (textHTML.length<8000){
      sendResponse({text:plainText, textHTML:textHTML, parentNode:parentNode, error:""});
      return true;
    }
    else {
      sendResponse({error:"text too long"})
      return true
      }
    }
});

// function replaceSelectedText(replacementText) {
//   debugger
//     var sel, range;
//     if (window.getSelection) {
//         sel = window.getSelection();
//         if (sel.rangeCount) {
//             range = sel.getRangeAt(0);
//             range.deleteContents();
//             range.insertNode(document.createTextNode(replacementText));
//         }
//     } else if (document.selection && document.selection.createRange) {
//         range = document.selection.createRange();
//         range.text = replacementText;
//     }
// }

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
