chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('I AM HERE');
  alert('icon clickedddd');
  console.log('CLICKED')
  debugger;
});


// $(window).on("load", function(){
//   console.log( "ready!" );
//   $(document).on('keypress',function(event) {
//     //checks if the editable div (the div in which we write our emails is currently loaded in the DOM)
//     var text_box = $('div.nH').find('div.aO7').find('div.editable')
//     if (text_box.length>0)
//     {
//       //when spacebar is hit while focused on the email text writer this code will be hit
//       if (event.which === 32)
//       {
//         console.log( "Spacebar" );
//         //Ajax call to send to text to API
//         var params ={
//           "documents": [{
//           "language": "en",
//            "id": "1",
//            "text": text_box.text()
//           }]};
//         $.ajax({
//           url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param( params ),
//           beforeSend: function(xhrObj){
//           // Request headers
//           xhrObj.setRequestHeader("Content-Type","application/json");
//           xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","98606b9680ac40d19fc4e4e6d0746715");
//           xhrObj.setRequestHeader("Accept","application/json");
//           },
//           type: "POST",
//           // Request body
//           data: JSON.stringify(params)
//           })
//           .done(function(data) {
//             //sentiment data being returned here
//             //num from 0-1
//             console.log(data);
//
//         });
//         $.ajax({
//           url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" + $.param( params ),
//           beforeSend: function(xhrObj){
//           // Request headers
//           xhrObj.setRequestHeader("Content-Type","application/json");
//           xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","98606b9680ac40d19fc4e4e6d0746715");
//           xhrObj.setRequestHeader("Accept","application/json");
//           },
//           type: "POST",
//           // Request body
//           data: JSON.stringify(params)
//           })
//           .done(function(data) {
//             //key phrase data being returned here
//             //array of strings
//             console.log(data)
//         });
//       }
//     }
//   });
// });
