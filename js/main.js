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

//BEGIN
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
$(".img-slide").slick({
  // lazyLoad: 'progressive',
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  arrows: false,
  infinte: true,
  swipeToSlide: true
});
