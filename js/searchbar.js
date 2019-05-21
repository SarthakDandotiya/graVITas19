$(function() {
  //   $("#mix-wrapper").mixItUp();

  var inputText;
  var $matching = $();

  // Delay function
  var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $("#input").keyup(function() {
    // Delay function invoked to make sure user stopped typing
    delay(function() {
      inputText = $("#input")
        .val()
        .toLowerCase();

      // Check to see if input field is empty
      if (inputText.length > 0) {
        $(".mix-target").each(function() {
          $this = $("this");
          // add item to be filtered out if input text matches items inside the title
          if (
            $(this)
              .find(".title")
              .html()
              .toLowerCase()
              .match(inputText.trim()) ||
            $(this)
              .find(".org")
              .html()
              .toLowerCase()
              .match(inputText.trim())
          ) {
            $matching = $matching.add(this);
          } else {
            // removes any previously matched item
            $matching = $matching.not(this);
          }
        });
        $("#mix-wrapper").mixItUp("filter", $matching);
        // console.log($matching.length);
      } else {
        // resets the filter to show all item if input is empty
        $("#mix-wrapper").mixItUp("filter", ".all");
      }
    }, 200);
  });
});
