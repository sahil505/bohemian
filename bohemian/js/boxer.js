app.controller('AdventureCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.adventureIndex = 0;
var adventureIndex = $scope.adventureIndex;


$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/adventure",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.adventureData = response.data.events;
      var imageLink = response.data.events[adventureIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();

  $scope.tabAdventure = function(a) {
    // console.log(a);
    $scope.adventureIndex = a;
    var adventureIndex =a;
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/adventure",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.adventureData = response.data.events;
        var imageLink = response.data.events[adventureIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

  };

  $scope.register = function(register){
    console.log(resgister);
  };


  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){

    if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }


    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }

  };




  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('ComedyCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.comedyIndex = 0;
var comedyIndex = $scope.comedyIndex;

$scope.init = function(){
  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/comedy",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.comedyData = response.data.events;
      var imageLink = response.data.events[comedyIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();
$scope.tabComedy = function(a) {
  // console.log(a);
  $scope.comedyIndex = a;
  var comedyIndex =a;

    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/comedy",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.comedyData = response.data.events;
        var imageLink = response.data.events[comedyIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });


};


$rootScope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/registeremail.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';



    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  function DialogController($scope, $mdDialog) {

    $rootScope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


$rootScope.Register = function(data,email,path){
if($rootScope.userDetails != null){
$rootScope.reg_path = path;
console.log(path);
$rootScope.data_regemail = email;
$rootScope.data_reg = data;
console.log(data);
  console.log(data.reg_mode);

  if(data.reg_mode == "Email"){
      $rootScope.showAdvanced();
      console.log(data.reg_mode);
      $rootScope.reg_modeEmail = true;
      $rootScope.reg_modeWebsite = false;

  }

  else if (data.reg_mode == "Website") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = true;
      $rootScope.reg_modeEmail = false;

      // console.log(fullData);
  }

  else if (data.reg_mode == "External") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = false;
      $rootScope.reg_modeEmail = false;
      $rootScope.reg_modeLink = true;

  }

 }

  else{
    $rootScope.reg_path = path;
    $location.path("/login");
    $mdToast.show(
      $mdToast.simple()
      .textContent("Please Login First")
      .position('top left')
      .hideDelay(3000)
    );
  }


};

$rootScope.toggleLeft = buildToggler('left');
    $rootScope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }



});

app.controller('CulinaryCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {




$scope.culinaryIndex = 0;
var culinaryIndex = $scope.culinaryIndex;
$scope.init = function(){
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/culinary",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        $scope.culinaryData = response.data.events;
        var imageLink = response.data.events[culinaryIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

};


// $scope.init();

$scope.tabCulinary = function(a) {
  // console.log(a);
  $scope.culinaryIndex = a;
  var culinaryIndex =a;
  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/culinary",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      // $scope.culinaryData = response.data.events;
      var imageLink = response.data.events[culinaryIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });


};

$rootScope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/registeremail.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';



    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  function DialogController($scope, $mdDialog) {

    $rootScope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


$rootScope.Register = function(data,email,path){
if($rootScope.userDetails != null){
$rootScope.reg_path = path;
console.log(path);
$rootScope.data_regemail = email;
$rootScope.data_reg = data;
console.log(data);
  console.log(data.reg_mode);

  if(data.reg_mode == "Email"){
      $rootScope.showAdvanced();
      console.log(data.reg_mode);
      $rootScope.reg_modeEmail = true;
      $rootScope.reg_modeWebsite = false;

  }

  else if (data.reg_mode == "Website") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = true;
      $rootScope.reg_modeEmail = false;

      // console.log(fullData);
  }

  else if (data.reg_mode == "External") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = false;
      $rootScope.reg_modeEmail = false;
      $rootScope.reg_modeLink = true;

  }

 }

  else{
    $rootScope.reg_path = path;
    $location.path("/login");
    $mdToast.show(
      $mdToast.simple()
      .textContent("Please Login First")
      .position('top left')
      .hideDelay(3000)
    );
  }


};



$rootScope.toggleLeft = buildToggler('left');
    $rootScope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }




});

app.controller('DanceCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;
$rootScope.reg_modeEmail = false;
$rootScope.reg_modeWebsite = false;
$scope.danceIndex = 0;
// $rootScope.data_reg = [];
if($rootScope.userDetails != null){
  console.log("logged in");
}
else {
  console.log("not logged in");
}
var danceIndex = $scope.danceIndex;

console.log(danceIndex);

$scope.load = function(){

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/dance",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.danceData = response.data.events;
      $scope.data = $scope.danceData;
      // $scope.danceImage = "background-image:url('')"$scope.danceData[danceIndex].photos[0];
      var imageLink = $scope.danceData[danceIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });


};

// $scope.init();

$scope.tabDance = function(a) {
  // console.log(a);
  // $scope.init();
  $scope.danceIndex = a;
  var danceIndex = a;
  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/dance",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      // $scope.danceData = response.data.events;
      // $scope.danceImage = "background-image:url('')"$scope.danceData[danceIndex].photos[0];
      var imageLink = response.data.events[danceIndex].photos[0];
      console.log(danceIndex);
      $scope.imgLink = 'background-image:url('+imageLink+')';
      console.log(imageLink);
      console.log($scope.imgLink);

  });
  // $scope.imgLink = 'background-image:url('+imageLink+')';

};

$rootScope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/registeremail.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';



    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  function DialogController($scope, $mdDialog) {

    $rootScope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


$rootScope.Register = function(data,email,path){

if($rootScope.userDetails != null){

console.log($rootScope.userDetails);
$rootScope.reg_path = path;
console.log(path);
$rootScope.data_regemail = email;
$rootScope.data_reg = data;
console.log(data);
  console.log(data.reg_mode);

  if(data.reg_mode == "Email"){
      $rootScope.showAdvanced();
      console.log(data.reg_mode);
      $rootScope.reg_modeEmail = true;
      $rootScope.reg_modeWebsite = false;
      $rootScope.reg_modeLink = false;

  }

  else if (data.reg_mode == "Website") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = true;
      $rootScope.reg_modeEmail = false;
      $rootScope.reg_modeLink = false;

      // console.log(fullData);
  }

  else if (data.reg_mode == "External") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = false;
      $rootScope.reg_modeEmail = false;
      $rootScope.reg_modeLink = true;

  }

}
  else{
    $rootScope.reg_path = path;
    $location.path("/login");
    $mdToast.show(
      $mdToast.simple()
      .textContent("Please Login First")
      .position('top left')
      .hideDelay(3000)
    );
  }

};


$rootScope.toggleLeft = buildToggler('left');
    $rootScope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }










});

app.controller('DebateCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.debateIndex = 0;
var debateIndex = $scope.debateIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/debating",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.debateData = response.data.events;
      var imageLink = response.data.events[debateIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();

  $scope.tabDebate = function(a) {
    // console.log(a);
    $scope.debateIndex = a;
    var debateIndex =a;
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/debating",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.danceData = response.data.events;
        // $scope.danceImage = "background-image:url('')"$scope.danceData[danceIndex].photos[0];
        var imageLink = response.data.events[debateIndex].photos[0];
        // console.log(danceIndex);
        $scope.imgLink = 'background-image:url('+imageLink+')';
        console.log(imageLink);
        console.log($scope.imgLink);

    });

  };



  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }

    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('DramaCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDrama = true;


$scope.dramaticsIndex = 0;
var dramaticsIndex = $scope.dramaticsIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/dramatics",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDrama = false;
      $scope.dramaticsData = response.data.events;
      var imageLink = response.data.events[dramaticsIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';
  });


};


$scope.tabDramatics = function(a) {
  // console.log(a);
  $scope.dramaticsIndex = a;
  var dramaticsIndex =a;
  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/dramatics",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      // $scope.dramaticsData = response.data.events;
      var imageLink = response.data.events[dramaticsIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';
  });

};


$rootScope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/registeremail.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';



    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  function DialogController($scope, $mdDialog) {

    $rootScope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


// $scope.init();

$rootScope.Register = function(data,email,path){

  if($rootScope.userDetails != null){
console.log(data);
$rootScope.reg_path = path;
console.log(path);
$rootScope.data_regemail = email;
$rootScope.data_reg = data;
console.log(data);
  console.log(data.reg_mode);

  if(data.reg_mode == "Email"){
      $rootScope.showAdvanced();
      console.log(data.reg_mode);
      $rootScope.reg_modeEmail = true;
      $rootScope.reg_modeWebsite = false;

  }

  else if (data.reg_mode == "Website") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = true;
      $rootScope.reg_modeEmail = false;

      // console.log(fullData);
  }

  else if (data.reg_mode == "External") {
    $rootScope.showAdvanced();
      $rootScope.reg_modeWebsite = false;
      $rootScope.reg_modeEmail = false;
      $rootScope.reg_modeLink = true;

  }

 }

  else{
    $rootScope.reg_path = path;
    $location.path("/login");
    $mdToast.show(
      $mdToast.simple()
      .textContent("Please Login First")
      .position('top left')
      .hideDelay(3000)
    );
  }


};

$rootScope.toggleLeft = buildToggler('left');
    $rootScope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }



});

app.controller('FacCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.facIndex = 0;
var facIndex = $scope.facIndex;

$scope.init = function(){

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/FACC",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.facData = response.data.events;
      var imageLink = response.data.events[facIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();


  $scope.tabFac = function(a) {
    // console.log(a);
    $scope.facIndex = a;
    var facIndex =a;

    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/FACC",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.facData = response.data.events;
        var imageLink = response.data.events[facIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

  };


  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
    if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }

    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('GlamourCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.glamourIndex = 0;
var glamourIndex = $scope.glamourIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/glamour",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.glamourData = response.data.events;
      var imageLink = response.data.events[glamourIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};


// $scope.init();

  $scope.tabGlamour = function(a) {
    // console.log(a);
    $scope.glamourIndex = a;
    var glamourIndex =a;

    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/glamour",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.glamourData = response.data.events;
        var imageLink = response.data.events[glamourIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

  };

  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }


    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('HindiCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.hindiIndex = 0;
var hindiIndex = $scope.hindiIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/hindisamiti",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.hindiData = response.data.events;
      var imageLink = response.data.events[hindiIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();

  $scope.tabHindi = function(a) {
    // console.log(a);
    $scope.hindiIndex = a;
    var hindiIndex = a;
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/hindisamiti",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.hindiData = response.data.events;
        var imageLink = response.data.events[hindiIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

  };


  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
    if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }

    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('MainCtrl', function($scope, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$http,$window) {


if($rootScope.reg_path != '/home'){
  var REGISTER_PATH = $rootScope.reg_path;
  console.log(REGISTER_PATH + "korku");
}

$scope.isLogin = false;


  $rootScope.isPath= function(viewLocation) {
      return viewLocation === $location.path();
    };
    $rootScope.userDetails = Auth.getuserFullDetails();

    // console.log($scope.userDetails);

  if($rootScope.isPath('/login')===true && $rootScope.userDetails !=undefined){
    $location.path("/home");

  }


    $scope.logInUser=function (user) {
      $scope.isLogin = true;
    if (user===undefined) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Please check your input field')
        .position('bottom right')
        .hideDelay(3000)
      );
    }
    Auth.login(user).then(function(response) {
      console.log(response);
      $scope.userDetails = response;
      $scope.isLogin = false;

      if(REGISTER_PATH == undefined){
        $window.location.href = "http://rdv-iitd.com/";
      }
      else{
        $location.path(REGISTER_PATH);
      }

      $mdToast.show(
        $mdToast.simple()
        .textContent('User sucessfully logged in!')
        .position('bottom right')
        .hideDelay(3000)
      );

    }, function (error) {
      console.log(error);
      $scope.isLogin = false;
        $mdToast.show(
          $mdToast.simple()
          .textContent(error.data.message)
          .position('bottom right')
          .hideDelay(5000)
        );


  });
};

$scope.bro = function(){
  console.log("working");
};

$scope.animation = {};
  $scope.animation.current = 'fadeInUp';
  $scope.animation.previous = $scope.animation.current;
  $scope.ElementIn = function($el) {
    $el.removeClass('not-visible');
    $el.addClass('animated ' + $scope.animation.current);
  };
  $scope.animateElementOut = function($el) {
    $el.addClass('not-visible');
    $el.removeClass('animated ' + $scope.animation.current);
  };

$scope.bgcolors = [

            "eventsbg1",
            "eventsbg2",
            "eventsbg3",
            "eventsbg4",
            "eventsbg5",
            "eventsbg6"

];

$scope.compevents=[
              {
                "title":"Dance",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FFECB3",
                "href":"#!/dance",
                "image":"url('images/dance.jpg')"
              },
              {
                "title":"Dramatics",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FF8A65",
                "href":"#!/drama",
                "image":"url('images/drama.jpg')"
              },
              {
                "title":"Film and Design",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#E64A19",
                "href":"#!/pfc",
                "image":"url('images/pfc.jpg')"
              },
              {
                "title":"Fine Arts and Crafts",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#43A047",
                "href":"#!/fac",
                "image":"url('images/finearts.jpg')"
              },
              {
                "title":"Music",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#512DA8",
                "href":"#!/music",
                "image":"url('images/music.jpg')"
              },
              {
                "title":"Debate",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#4A148C",
                "href":"#!/debate",
                "image":"url('images/debate.jpg')"
              },
              {
                "title":"Literary",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#ef5350",
                "href":"#!/literary",
                "image":"url('images/lit.jpg')"
              },
              {
                "title":"Quizzing",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#536DFE",
                "href":"#!/quiz",
                "image":"url('images/quiz.jpg')"
              },
              {
                "title":"Hindi Samiti",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#00ACC1",
                "href":"#!/hindi",
                "image":"url('images/hindi.jpg')"
              },
              {
                "title":"Magic",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#00695C",
                "href":"#!/magic",
                "image":"url('images/magic.jpg')"
              },
              {
                "title":"Comedy",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#424242",
                "href":"#!/comedy",
                "image":"url('images/comedy.jpg')"
              },
              {
                "title":"Glamour",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FFECB3",
                "href":"#!/glamour",
                "image":"url('images/glamour.jpg')"
              },
              {
                "title":"Adventure",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#ff1744",
                "href":"#!/adventure",
                "image":"url('images/adventure.jpg')"
              },
              {
                "title":"Culinary",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FF8F00",
                "href":"#!/culinary",
                "image":"url('images/culinary.jpg')"
              }
];


// pronites carousel config

$scope.pronitesCarousel = [
                {
                  "title":"Spectrum",
                  "image1":"images/spectrum1.png",
                  "image2":"images/spectrum2.png"
                },
                {
                  "title":"Melange",
                  "image1":"images/melange1.png",
                  "image2":"images/melange2.png"
                },
                {
                  "title":"Kaleidoscope",
                  "image1":"images/kal1.png",
                  "image2":"images/kal2.png"
                },
                {
                  "title":"Dhoom",
                  "image1":"images/dhoom1.png",
                  "image2":"images/dhoom2.png"
                }

];


// flicker effect







});

app.controller('LiteraryCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.literaryIndex = 0;
var literaryIndex = $scope.literaryIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/literary",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.literaryData = response.data.events;
      var imageLink = response.data.events[literaryIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();

  $scope.tabLiterary = function(a) {
    // console.log(a);
    $scope.literaryIndex = a;
    var literaryIndex =a;
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/literary",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.literaryData = response.data.events;
        var imageLink = response.data.events[literaryIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

  };


  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
    if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }


    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('MagicCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.magicIndex = 0;
var magicIndex = $scope.magicIndex;

$scope.init = function(){



    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/magic",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        $scope.magicData = response.data.events;
        var imageLink = response.data.events[magicIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

};

// $scope.init();

    $scope.tabMagic = function(a) {
      // console.log(a);
      $scope.magicIndex = a;
      var magicIndex =a;
      $http({
          method: "GET",
          url: URL_PREFIX+"category-event/magic",
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
              }
      }).then(function (response) {
          $scope.isDance = false;
          // $scope.magicData = response.data.events;
          var imageLink = response.data.events[magicIndex].photos[0];
          $scope.imgLink = 'background-image:url('+imageLink+')';

      });


    };


    $rootScope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/registeremail.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';



        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };


      function DialogController($scope, $mdDialog) {

        $rootScope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }


    $rootScope.Register = function(data,email,path){
      if($rootScope.userDetails != null){
    $rootScope.reg_path = path;
    console.log(path);
    $rootScope.data_regemail = email;
    $rootScope.data_reg = data;
    console.log(data);
      console.log(data.reg_mode);

      if(data.reg_mode == "Email"){
          $rootScope.showAdvanced();
          console.log(data.reg_mode);
          $rootScope.reg_modeEmail = true;
          $rootScope.reg_modeWebsite = false;

      }

      else if (data.reg_mode == "Website") {
        $rootScope.showAdvanced();
          $rootScope.reg_modeWebsite = true;
          $rootScope.reg_modeEmail = false;

          // console.log(fullData);
      }

      else if (data.reg_mode == "External") {
        $rootScope.showAdvanced();
          $rootScope.reg_modeWebsite = false;
          $rootScope.reg_modeEmail = false;
          $rootScope.reg_modeLink = true;

      }

    }

      else{
        $rootScope.reg_path = path;
        $location.path("/login");
        $mdToast.show(
          $mdToast.simple()
          .textContent("Please Login First")
          .position('top left')
          .hideDelay(3000)
        );
      }


    };

    $rootScope.toggleLeft = buildToggler('left');
        $rootScope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
          return function() {
            $mdSidenav(componentId).toggle();
          };
        }




});

app.controller('MusicCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.musicIndex = 0;
var musicIndex = $scope.musicIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/music",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.musicData = response.data.events;
      console.log($scope.musicData);
      var imageLink = response.data.events[musicIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();



  $scope.tabMusic = function(a) {
    // console.log(a);
    $scope.musicIndex = a;
    var musicIndex = a;
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/music",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.musicData = response.data.events;
        var imageLink = response.data.events[musicIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });

  };

  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }


    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }



});

app.controller('PfcCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.pfcIndex = 0;
var pfcIndex = $scope.pfcIndex;

$scope.init = function(){


  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/pfc",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.pfcData = response.data.events;
      var imageLink = response.data.events[pfcIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};

// $scope.init();

  $scope.tabPfc = function(a) {
    // console.log(a);
    $scope.pfcIndex = a;
    var pfcIndex =a;

    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/pfc",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.pfcData = response.data.events;
        var imageLink = response.data.events[pfcIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });


  };

  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }



    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }

    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }



});

app.controller('QuizCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog,$mdSidenav) {

$scope.isDance = true;


$scope.quizIndex = 0;
var quizIndex = $scope.quizIndex;

$scope.init = function(){

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/quizzing",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.quizData = response.data.events;
      var imageLink = response.data.events[quizIndex].photos[0];
      $scope.imgLink = 'background-image:url('+imageLink+')';

  });

};


// $scope.bro();

  $scope.tabQuiz = function(a) {
    // console.log(a);
    $scope.quizIndex = a;
    var quizIndex = a;
    $http({
        method: "GET",
        url: URL_PREFIX+"category-event/quizzing",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
            }
    }).then(function (response) {
        $scope.isDance = false;
        // $scope.quizData = response.data.events;
        var imageLink = response.data.events[quizIndex].photos[0];
        $scope.imgLink = 'background-image:url('+imageLink+')';

    });


  };


  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/registeremail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $rootScope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


  $rootScope.Register = function(data,email,path){
    if($rootScope.userDetails != null){
  $rootScope.reg_path = path;
  console.log(path);
  $rootScope.data_regemail = email;
  $rootScope.data_reg = data;
  console.log(data);
    console.log(data.reg_mode);

    if(data.reg_mode == "Email"){
        $rootScope.showAdvanced();
        console.log(data.reg_mode);
        $rootScope.reg_modeEmail = true;
        $rootScope.reg_modeWebsite = false;

    }

    else if (data.reg_mode == "Website") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = true;
        $rootScope.reg_modeEmail = false;

        // console.log(fullData);
    }

    else if (data.reg_mode == "External") {
      $rootScope.showAdvanced();
        $rootScope.reg_modeWebsite = false;
        $rootScope.reg_modeEmail = false;
        $rootScope.reg_modeLink = true;

    }

  }

    else{
      $rootScope.reg_path = path;
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }


  };

  $rootScope.toggleLeft = buildToggler('left');
      $rootScope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }




});

app.controller('RegisterCtrl', function($scope, $document,$timeout, $log,$mdToast,$http,$mdDialog,$rootScope,$window,$location,Auth,md5) {


  // console.log(md5.createHash("korkudeepak@gmail.com"));
  // console.log("hashing works");
  $scope.userDetails = Auth.getuserFullDetails();

  $rootScope.isPath= function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isRegister = false;

  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/otpdialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };


    function DialogController($scope, $mdDialog) {

      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  $scope.signUp=function (user) {
    $rootScope.preuser = user;

      if(user.password == user.confirm_password){
        console.log(user);
        $rootScope.showAdvanced();

      $http({
        url:URL_PREFIX+"register/",
        method:"POST",
        headers:{
          'Content-Type': 'application/json; charset=UTF-8'
        },
        data:{
          'email':user.email,
          'gender':user.gender,
          'college':user.college,
          'gender':user.gender,
          'contact_number':user.contact_number,
          'first_name':user.firstname,
          'last_name':user.lastname,
          'referral_code':user.referral_code,
          'password':md5.createHash(user.password)
        }
      }).then(function sucessCallback(response) {
        console.log(response);
        if (response.status===200){
          console.log(response);
          // $location.path("/login");
          $mdToast.show(
            $mdToast.simple()
            .textContent(response)
            .position('bottom right')
            .hideDelay(3000)
          );
        }
      }, function errorCallback(error) {
        console.log(error);

          $mdToast.show(
            $mdToast.simple()
            .textContent(error.data.message)
            .position('bottom right')
            .hideDelay(3000)
          );

      });
    }

    else{
      $mdToast.show(
        $mdToast.simple()
        .textContent('Please Confirm password')
        .position('bottom right')
        .hideDelay(3000)
      );
    }
    };

  $scope.submitOtp = function(user){
    $scope.isRegister = true;
    var preuser = $rootScope.preuser;
    console.log(user);
    console.log(preuser);
    $http({
      url:URL_PREFIX+"register/",
      method:"POST",
      headers:{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data:{
        'email':preuser.email,
        'first_name':preuser.firstname,
        'last_name':preuser.lastname,
        'college':preuser.college,
        'gender':preuser.gender,
        'contact_number':preuser.contact_number,
        'referral_code':preuser.referral_code,
        'password':md5.createHash(preuser.password),
        'otp':user.otp
      }
    }).then(function sucessCallback(response) {
      console.log(response);
      $scope.isRegister = false;
      userFullDetails = {
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          rdv_number: response.data.user.rdv_number,
          access_token:response.data.token,
          points:response.data.user.rdv_points
      };
      $window.localStorage.userFullDetails = JSON.stringify(userFullDetails);
      if (response.status===200){
        console.log(response);
        // $location.path("/home");
        $window.location.href = "http://rdv-iitd.com";
        $mdToast.show(
          $mdToast.simple()
          .textContent("Successfully Logged In")
          .position('bottom right')
          .hideDelay(3000)
        );
      }
    }, function errorCallback(error) {
          $scope.isRegister = false;
        $mdToast.show(
          $mdToast.simple()
          .textContent(error.data.message)
          .position('bottom right')
          .hideDelay(3000)
        );

    });

  };





});

app.controller('RegisterDialogCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope,$mdDialog) {

// console.log($rootScope.userDetails);
if($rootScope.userDetails){
  $scope.fullName = $rootScope.userDetails.first_name + " "+ $rootScope.userDetails.last_name;
}
$scope.userDetails = $rootScope.userDetails
var RDVdetails = $rootScope.userDetails;
console.log(RDVdetails);
  $scope.checkLogin = function(){
    if(RDVdetails != null){
      return true;
    }
    else {
      return false;
    }
  }
$scope.regPath = $rootScope.reg_path;
REGISTER_PATH = $rootScope.reg_path;
console.log(REGISTER_PATH);
console.log($scope.regPath);
$scope.regData = $rootScope.data_reg;

$scope.regDataEmail = $rootScope.data_regemail;
console.log($scope.regDataEmail);
$scope.regWebsite = $rootScope.reg_modeWebsite;
$scope.regLink = $rootScope.reg_modeLink;
console.log($scope.regLink);

console.log("reg website");
console.log($scope.regWebsite);
$scope.regEmail = $rootScope.reg_modeEmail;
console.log("reg email");
console.log($scope.regEmail);
$scope.checkRegType = function(type){
  if(type == "Team"){
    return true;
  }
  else {
    return false;
  }
};
// console.log($scope.regData);
console.log("korku");
$scope.checkRDV_Num = function(number){
  if(number === RDVdetails.rdv_number){
    return true;
  }
  else {
    return false;
  }
}



if(RDVdetails){
  $scope.TeamUpload = [RDVdetails.rdv_number];
  console.log($scope.TeamUpload);
}


$scope.addMember = function(){
  $scope.TeamUpload.push('');
}

$scope.test = function(){
  console.log($scope.TeamUpload);
}

$scope.setNum = function(data,index,$event){

  $scope.TeamUpload[index] = data;
  console.log($scope.TeamUpload);
}


$scope.deleteNum = function(index){
  $scope.TeamUpload.splice(index, 1);
  console.log($scope.TeamUpload);
}
if($scope.regData.reg_type == "Single"  && $scope.regData.reg_link_upload){
  $scope.singleLink = true;
}

if($scope.regData.reg_type == "Single"  && !$scope.regData.reg_link_upload){
  $scope.single = true;
}

if($scope.regData.reg_type == "Team"  && $scope.regData.reg_link_upload){
  $scope.teamLink = true;
}

if($scope.regData.reg_type == "Team"  && !$scope.regData.reg_link_upload){
  $scope.team = true;
}



$scope.singleLinkRegister = function(user,id){
  console.log(user);
  console.log(id);
  console.log($scope.TeamUpload);
  if($scope.singleLink){
    var data = {};
    data['register'] = RDVdetails.rdv_number;
    data['submission'] = user.submission;
    data['team_name'] = user.team_name;

    console.log(data);
  }
  else if($scope.single){
    var data = {};
    data['register'] = RDVdetails.rdv_number;
    data['register'] = RDVdetails.rdv_number;
    data['team_name'] = user.team_name;
    console.log(data);

  }



if(RDVdetails != null){

      $http({
        url:URL_PREFIX+"event/register/"+id,
        method:"POST",
        headers:{
          'Content-Type': 'application/json; charset=UTF-8'
        },
        data
      }).then(function sucessCallback(response) {
        console.log(response);
        $rootScope.hide();
        if (response.status===200){
          console.log(response);
          $mdToast.show(
            $mdToast.simple()
            .textContent("Registered Successfully")
            .position('top left')
            .hideDelay(3000)
          );
        }
      }, function errorCallback(error) {
        console.log(error);

          $mdToast.show(
            $mdToast.simple()
            .textContent(error.data.message)
            .position('top left')
            .hideDelay(5000)
          );

      });
    }

    else{
      $location.path("/login");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Please Login First")
        .position('top left')
        .hideDelay(3000)
      );
    }

};

$scope.teamLinkRegister = function(user,id){
  console.log(user);
  if(user === undefined){
    $mdToast.show(
      $mdToast.simple()
      .textContent("Please check the fields")
      .position('top left')
      .hideDelay(3000)
    );
  }

  else{

  console.log(user);
  console.log(id);
  console.log($scope.TeamUpload);

  if($scope.teamLink){
    var data = {};
    data['team_name'] = user.team_name;
    data['submission'] = user.submission;
    data['register'] = $scope.TeamUpload;

    console.log(data);
  }
  else if($scope.team){
    var data = {};
    data['team_name'] = user.team_name;
    data['register'] = $scope.TeamUpload;
    console.log(data);

  }

  $http({
    url:URL_PREFIX+"event/register/"+id,
    method:"POST",
    headers:{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data
  }).then(function sucessCallback(response) {
    console.log(response);
    if (response.status===200){
      console.log(response);
      $rootScope.hide();
      console.log("hide");
      $mdToast.show(
        $mdToast.simple()
        .textContent("Registered Successfully")
        .position('top left')
        .hideDelay(3000)
      );
    }


  }, function errorCallback(error) {
    console.log(error);

      $mdToast.show(
        $mdToast.simple()
        .textContent(error.data.message)
        .position('top left')
        .hideDelay(5000)
      );

  });

  }
}

});
