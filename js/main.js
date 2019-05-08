// NAVBAR
$(document).ready(function() {
  $(".sidenav").sidenav();
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
console.log(window.innerWidth);
$(".img-slide").slick({
  lazyLoad: "progressive",
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: window.innerWidth < 650 ? (window.innerWidth < 450 ? 1 : 2) : 3,
  arrows: false,
  infinte: true,
  swipeToSlide: true
});
