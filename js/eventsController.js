var app = angular.module("myApp", []);
app.controller("eventCtrl", function($scope, $http) {
  $scope.working = true;
  const URL = "https://gravitas-18.herokuapp.com/events";
  $http.get(URL).then(response => {
    // console.log("EVENTS ", response.data);
    $scope.events = response.data;
    $scope.category;
    $scope.working = false;
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
      callbacks: {
        onMixEnd: function(state) {
          // console.log("sdjbksdjnfskfjjslfkjlkf");
          console.log(state);
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
  });

  $scope.show = function(id) {
    if (id == "5bb48680960c910015a0224f") {
      window.location.href = "democracy-wall.html";
    } else {
      sessionStorage.setItem(
        "category",
        jQuery("#showcase .card .btn a.selected")
          .attr("data-type")
          .toLowerCase()
      );
      sessionStorage.setItem("ID", id);
      window.location.href = "eventsingle.html";
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
