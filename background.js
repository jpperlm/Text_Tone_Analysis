$(window).on("load", function(){
  console.log( "ready!" );
  $(document).on('keypress',function(event) {
    if ($('div.nH').find('div.aO7').find('div.editable').length>0)
    {
    console.log( "Handler for .keypress() called." );
    // PUT CODE IN HERE FOR SENDING AJAX CALLS
    }
  });
  // $(document).on('click', function(event){
  //   debugger
  // });
});
