// NAVBAR
$(document).ready(function() {
  $(".sidenav")
    .sidenav()
    .on("click tap", "li .x", () => {
      $(".sidenav").sidenav("close");
    });
  $(".dropdown-trigger").dropdown();

  $(".dropdown-trigger2").dropdown();
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};

//SCROLL
$(document).ready(function() {
  $("a.scroll").click(function(event) {
    event.preventDefault();
    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top },
      500
    );
  });
});

// GALLERY
// let sts = window.innerWidth < 650 ? (window.innerWidth < 450 ? 1 : 2) : 3;
// $(".img-slide").slick({
//   lazyLoad: "progressive",
//   autoplay: true,
//   autoplaySpeed: 2000,
//   slidesToShow: sts,
//   // variableWidth: true,
//   arrows: false,
//   infinte: true,
//   swipeToSlide: true
// });
