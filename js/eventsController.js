var app = angular.module("myApp", ["ngSanitize"]);
app.controller("eventCtrl", function($scope, $http, $sce) {
  $scope.working = true;
  $scope.working1 = false;
  var count = 0;
  const URL = "https://gravitas19.herokuapp.com/events";
  $http.get(URL).then(response => {
    // console.log("EVENTS ", response.data);
    $scope.events = response.data;
    $scope.category;

    $("#mix-wrapper").mixItUp({
      load: {
        sort: "order:asc"
      },
      animation: {
        effects: "fade rotateZ(-180deg)",
        duration: 700
      },
      selectors: {
        target: ".mix-target",
        filter: ".filter-btn",
        sort: ".sort-btn"
      },
      // controls: {
      //   enable: false
      // },
      callbacks: {
        onMixStart: function() {
          $(".gra-fail-message").fadeOut(0);
        },
        onMixFail: function() {
          // console.log("fail");
          count = count + 1;
          if (count != 1) $(".gra-fail-message").fadeIn(200);
        },
        onMixEnd: function(state) {
          // console.log("sdjbksdjnfskfjjslfkjlkf");
          // console.log(state);
        }
      }
    });

    if (localStorage.getItem("storageName") == "all") $("button.all").click();
    else if (localStorage.getItem("storageName") == "premium")
      $("button.premium").click();
    else if (localStorage.getItem("storageName") == "technical")
      $("button.technical").click();
    else if (localStorage.getItem("storageName") == "non-technical")
      $("button.non-technical").click();
    else if (localStorage.getItem("storageName") == "megathon")
      $("button.megathon").click();
    else if (localStorage.getItem("storageName") == "workshops")
      $("button.workshops").click();

    $scope.working = false;
  });

  $scope.show = function(id) {
    if (id == "5bb48680960c910015a0224f") {
      window.location.href = "democracy-wall.html";
    } else {
      const URL2 = "https://gravitas19.herokuapp.com/events/" + id;

      var abc = window.innerWidth;
      $(".iziModal1").iziModal({
        width: abc >= 740 ? 700 : abc - 30,
        // height: window.innerHeight >= 620 ? 600 : window.innerHeight - 90,
        radius: 5,
        padding: 20,
        // group: "products",
        loop: true
      });
      $http.get(URL2).then(response => {
        // console.log("EVENT Individual", response.data);
        $scope.individual = response.data;
        $scope.working1 = true;
        $("." + id + " .content").html(
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus aspernatur ipsam quisquam et ab, nesciunt illo a. Perspiciatis, olorum! Sed nihil illo maiores qui, ullam delectus nesciunt necessitatibus fuga, quod blanditiis recusandae aut sit modicupiditate tenetur dolorum minus cum fugit suscipit. Non, nulla.Delectus sint qui itaque ipsam?<div class='event_desc'></div><br /> <div class='row no-pad'><div class='col l5 no-pad'><div class='event_date'></div><div class='event_time'></div> <div class='event_fees'></div></div><div class='no-pad col l7'><div class='event_prize'></div><div class='event_venue'></div><div class='event_coor'></div></div></div><br><div><button class='btn right' disabled>Register</button></div><div>&nbsp;</div><div>&nbsp;</div>"
        );
        $("." + id + " .content .event_desc").html(
          $scope.individual.description
        );
        $("." + id + " .content .event_date").html(
          "<b>Date:</b> " + $scope.individual.date + ",2019 "
        );
        $("." + id + " .content .event_time").html(
          "<b>Timing:</b> " + $scope.individual.timing
        );
        $("." + id + " .content .event_venue").html(
          "<b>Venue:</b> " + $scope.individual.venue.requested.building
        );
        $("." + id + " .content .event_coor").html(
          "<b>Event Co-ordinator: </b>" +
            $scope.individual.coordinators[0].name +
            " (" +
            $scope.individual.coordinators[0].phone +
            ")"
        );
        $("." + id + " .content .event_fees").html(
          "<b>Registration Fees: </b>&#8377; " + $scope.individual.fees
        );
        if ($scope.individual.prize != undefined)
          $("." + id + " .content .event_prize").html(
            "<b>Prize Money: </b>&#8377; " + $scope.individual.prize
          );
      });
    }
  };

  $scope.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // $scope.sortVal = function(eve){
  //   if($scope.eventFilter == 'name'){
  //     return eve.name;
  //   } else if($scope.eventFilter == 'fee'){
  //     return parseInt(eve.fee);
  //   } else if($scope.eventFilter == 'duration'){
  //     console.log(eve.duration);
  //     return parseInt(eve.duration);
  //   } else {
  //     return 'date'
  //   }
  // }
});
