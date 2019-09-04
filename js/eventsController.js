var app = angular.module("myApp", ["ngSanitize"]);
app.controller("eventCtrl", function($scope, $http, $sce) {
  $scope.working = true;
  $scope.working1 = false;
  var count = 0;
  const URL = "https://gravitas19.herokuapp.com/events";

  // const URL = "https://smart-tiger-53.localtunnel.me";
  $http.get(URL).then(response => {
    // console.log("EVENTS ", response.data);
    $scope.events = response.data;
    var count = 0;
    $scope.events.forEach(event => {
      // console.log(event.thumbnailUrl);
      if (event.thumbnailUrl) {
        var k = 0;
        var str = event.thumbnailUrl;
        for (var i = str.length - 1; i > 0; i--) {
          if (event.thumbnailUrl[i] == "/") {
            k = i;
            count++;
            break;
          }
        }
        var str = event.thumbnailUrl.substring(k, event.thumbnailUrl.length);

        str = "img/thumbnails" + str;
        event.thumbnailUrl = str;
        // console.log(str);
      }
    });
    // console.log($scope.events);
    // console.log(count);
    // $scope.events = [
    //   {
    //     venue: {
    //       requested: {
    //         building: "SJT"
    //       }
    //     },
    //     organization: ["Demorg"],
    //     visible: true,
    //     _id: "5d3f209bc222ca5f0da88d83",
    //     name: "Demor",
    //     category: "non-technical",
    //     duration: "3",
    //     date: "2019-07-29T18:30:00.000Z",
    //     dateEnd: "2019-07-30T18:30:00.000Z",
    //     fees: "345",
    //     timing: "1970-01-01T06:30:00.000Z"
    //   },
    //   {
    //     venue: {
    //       requested: {
    //         building: "sjt",
    //         requirement: "chairs"
    //       }
    //     },
    //     organization: ["gggg"],
    //     visible: true,
    //     _id: "5d3f23ada1e55f60f1e97a50",
    //     name: "ggg",
    //     category: "non-technical",
    //     duration: "2",
    //     date: "2019-07-24T18:30:00.000Z",
    //     dateEnd: "2019-09-18T18:30:00.000Z",
    //     fees: "345",
    //     timing: "1970-01-01T06:39:00.000Z"
    //   }
    // ];

    // console.log("EVENTS ", $scope.events);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    for (i = 0; i < $scope.events.length; i++) {
      // console.log($scope.events[i].date);
      str = "";

      d = new Date($scope.events[i].date);

      if (d != "Invalid Date") {
        date = d.getDate().toString();
        month = d.getMonth();
        year = d.getFullYear().toString();
        str = str + date.toString() + "th " + months[month] + ", " + year;
      }

      // d = new Date($scope.events[i].dateEnd);
      // if (d) {
      //   date = d.getDate().toString();

      //   month = d.getMonth();
      //   year = d.getFullYear().toString();

      //   str = str + " to " + date.toString() + "th " + months[month];
      // }
      $scope.events[i].date = str;
    }

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

    // console.log(localStorage.getItem("storageName"));
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
        // bodyOverflow: true,
        // openFullscreen: true,
        // group: "products",
        loop: true
      });
      $http.get(URL2).then(response => {
        // console.log("EVENT Individual", response.data);
        $scope.individual = response.data;
        //-----------------
        //timing and date fixing
        t2 = "Invalid Date";
        // console.log($scope.individual.timing);
        t1 = new Date($scope.individual.timing);

        if ($scope.individual.timingEnd)
          t2 = new Date($scope.individual.timingEnd);
        str1 = "";
        if (t1 != "Invalid Date") {
          h = t1.getHours();
          m = t1.getMinutes();
          if (h < 10) h = "0" + h;
          if (m < 10) m = "0" + m;
          str1 = str1 + h + ":" + m;

          if (t2 != "Invalid Date") {
            h = t2.getHours();
            m = t2.getMinutes();
            if (h < 10) h = "0" + h;
            if (m < 10) m = "0" + m;
            str1 = str1 + " to " + h + ":" + m;
          }
          $scope.individual.timing = str1;
        }

        //---------------------------
        var months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        d = new Date($scope.individual.date);
        if (d != "Invalid Date") {
          str = "";
          if (d != "Invalid Date") {
            date = d.getDate().toString();
            month = d.getMonth();
            year = d.getFullYear().toString();
            str = str + date.toString() + "th " + months[month];
          }

          d = new Date($scope.individual.dateEnd);
          if (d != "Invalid Date") {
            date = d.getDate().toString();

            month = d.getMonth();
            year = d.getFullYear().toString();
            if (months[month] != "January")
              str = str + " to " + date.toString() + "th " + months[month];
          }
          $scope.individual.date = str;
        }

        //-----------------
        $scope.working1 = true;
        if ($scope.individual._id == "5d6f599c994b4c00174a45e4") {
          $("." + id + " .content").html(
            "<div class='event_desc'></div><br /> <div class='row no-pad'><div class='col l5 no-pad'><div class='event_date'></div><div class='event_time'></div> <div class='event_fees'></div></div><div class='no-pad col l7'><div class='event_prize'></div><div class='event_venue'></div><div class='event_coor'></div></div></div><br><div><a href='http://socialtransformers.tech'><button class='btn right'>Register</button></a></div><div>&nbsp;</div><div>&nbsp;</div>"
          );
        } else {
        $("." + id + " .content").html(
          "<div class='event_desc'></div><br /> <div class='row no-pad'><div class='col l5 no-pad'><div class='event_date'></div><div class='event_time'></div> <div class='event_fees'></div></div><div class='no-pad col l7'><div class='event_prize'></div><div class='event_venue'></div><div class='event_coor'></div><div class='download_url'></div></div></div><br><div><a href='http://info.vit.ac.in/gravitas2019/gravitas_login.asp'><button class='btn right'>Register</button></a></div><div>&nbsp;</div><div>&nbsp;</div>"
        );
        }
        $("." + id + " .content .event_desc").html(
          $scope.individual.description
        );
        $("." + id + " .content .event_date").html(
          "<b>Date:</b> " + $scope.individual.date
        );
        $("." + id + " .content .event_time").html(
          "<b>Timing:</b> " + $scope.individual.timing
        );
        if ($scope.individual.resourceUrl)
          $("." + id + " .content .download_url").html(
            "<b>Download File: </b><a href='" +
              $scope.individual.resourceUrl +
              "'><i class='download material-icons'>file_download</i>"
          );
        // if ($scope.timingEnd)
        //   $("." + id + " .content .event_time_end").html(
        //     "<b>End Time:</b> " + $scope.individual.timingEnd
        //   );
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
          "<b>Registration Fee: </b>&#8377; " + $scope.individual.fees
        );
        if (
          $scope.individual.prize != undefined &&
          $scope.individual.prize != "(Will be Updated)" &&
          $scope.individual.prize != "(Will be updated)" &&
          $scope.individual.prize != "" &&
          $scope.individual.prize != " "
        )
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
