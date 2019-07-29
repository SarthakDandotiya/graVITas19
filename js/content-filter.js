$(function() {
  var showcase = $("#showcase");
  var container = $(".conntainer");
  var abc = 100;
  if (window.innerWidth < 1010) abc = 80;
  if (window.innerWidth < 450) abc = 87;
  showcase.Cloud9Carousel({
    yOrigin: null,
    yRadius: -40,
    xRadius: abc == 0 ? null : abc,
    itemClass: "card",
    buttonLeft: $(".navbutton.left"),
    buttonRight: $(".navbutton.right"),
    // btn: $(".btn"),
    bringToFront: true,
    onLoaded: function() {
      showcase.css("visibility", "visible");
      showcase.css("display", "none");
      showcase.fadeIn(1500);
    }
  });

  // Simulate physical button click effect
  //
  $(".navbutton").click(function(e) {
    var b = $(e.target).addClass("down");
    setTimeout(function() {
      b.removeClass("down");
    }, 80);
  });

  $(document).keydown(function(e) {
    //
    // More codes: http://www.javascripter.net/faq/keycodes.htm
    //
    //
    // More codes: http://www.javascripter.net/faq/keycodes.htm
    //
    switch (e.keyCode) {
      /* left arrow */
      case 37:
        $(".navbutton.left").click();
        if (
          $(".sel")
            .text()
            .trim() == "All"
        )
          $("button.premium").click();
        if (
          $(".sel")
            .text()
            .trim() == "Premier"
        )
          $("button.workshops").click();
        if (
          $(".sel")
            .text()
            .trim() == "Workshops"
        )
          $("button.technical").click();
        if (
          $(".sel")
            .text()
            .trim() == "Technical"
        )
          $("button.non-technical").click();
        if (
          $(".sel")
            .text()
            .trim() == "Non-Technical"
        )
          // $("button.megathon").click();
          // $("button.all").click();
          $("#mix-wrapper").mixItUp("filter", ".all");
        // if (
        //   $(".sel")
        //     .text()
        //     .trim() == "Megathon"
        // )
        //   $("button.all").click();

        break;

      /* right arrow */
      case 39:
        $(".navbutton.right").click();
        if (
          $(".sel")
            .text()
            .trim() == "All"
        )
          // $("button.megathon").click();

          $("button.non-technical").click();
        // if (
        //   $(".sel")
        //     .text()
        //     .trim() == "Megathon"
        // )
        //   $("button.non-technical").click();
        if (
          $(".sel")
            .text()
            .trim() == "Non-Technical"
        )
          $("button.technical").click();
        if (
          $(".sel")
            .text()
            .trim() == "Technical"
        )
          $("button.workshops").click();
        if (
          $(".sel")
            .text()
            .trim() == "Workshops"
        )
          $("button.premium").click();
        if (
          $(".sel")
            .text()
            .trim() == "Premier"
        )
          $("button.all").click();
      // console.log("hit");
      // $("#mix-wrapper").mixItUp("filter", ".all");
    }
  });
});
