app.controller('CompetetionCtrl', function($scope,$http, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope) {

$scope.isDance = true;

$scope.danceIndex = 0;
$scope.dramaticsIndex = 0;
$scope.musicIndex = 0;
$scope.pfcIndex = 0;
$scope.comedyIndex = 0;
$scope.adventureIndex = 0;
$scope.culinaryIndex = 0;
$scope.debateIndex = 0;
$scope.pfcIndex = 0;
$scope.facIndex = 0;
$scope.glamourIndex = 0;
$scope.hindiIndex = 0;
$scope.literaryIndex = 0;
$scope.magicIndex = 0;
$scope.quizIndex = 0;
$scope.init = function(){

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/dance",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.danceData = response.data.events;
  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/dramatics",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.dramaticsData = response.data.events;
  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/music",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.musicData = response.data.events;

  });
  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/pfc",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.pfcData = response.data.events;

  });
  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/comedy",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.comedyData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/adventure",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.adventureData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/culinary",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.culinaryData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/debate",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.debateData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/fac",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.facData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/glamour",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.glamourData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/hindi",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.hindiData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/literary",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.literaryData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/quiz",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.quizData = response.data.events;

  });

  $http({
      method: "GET",
      url: URL_PREFIX+"category-event/magic",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
          }
  }).then(function (response) {
      $scope.isDance = false;
      $scope.magicData = response.data.events;

  });


}

$scope.init();

$scope.tabDance = function(a) {
  // console.log(a);
  $scope.danceIndex = a;

};
$scope.tabMusic = function(a) {
  // console.log(a);
  $scope.musicIndex = a;

};
$scope.tabPfc = function(a) {
  // console.log(a);
  $scope.pfcIndex = a;

};
$scope.tabDramatics = function(a) {
  // console.log(a);
  $scope.dramaticsIndex = a;

}
$scope.tabCulinary = function(a) {
  // console.log(a);
  $scope.culinaryIndex = a;

}
$scope.tabDebate = function(a) {
  // console.log(a);
  $scope.debateIndex = a;

}
$scope.tabFac = function(a) {
  // console.log(a);
  $scope.facIndex = a;

}
$scope.tabGlamour = function(a) {
  // console.log(a);
  $scope.glamourIndex = a;

}
$scope.tabHindi = function(a) {
  // console.log(a);
  $scope.hindiIndex = a;

}
$scope.tabLiterary = function(a) {
  // console.log(a);
  $scope.literaryIndex = a;

}
$scope.tabMagic = function(a) {
  // console.log(a);
  $scope.magicIndex = a;

}
$scope.tabQuiz = function(a) {
  // console.log(a);
  $scope.quizIndex = a;

}
$scope.tabAdventure = function(a) {
  // console.log(a);
  $scope.adventureIndex = a;

}
$scope.tabComedy = function(a) {
  // console.log(a);
  $scope.comedyIndex = a;

}




});

app.controller('MainCtrl', function($scope, $document,$timeout, $log, Auth,$location,$mdToast,$rootScope) {

  $rootScope.isPath= function(viewLocation) {
      return viewLocation === $location.path();
    };
    $scope.userDetails = Auth.getuserFullDetails();

    // console.log($scope.userDetails);

  if($rootScope.isPath('/')===true && $scope.userDetails !=undefined){
    $location.path("/home");

  }


    $scope.logInUser=function (user) {
    if (user===undefined) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Please check your input field')
        .position('bottom right')
        .hideDelay(3000)
      );
    }
    Auth.login(user).then(function(response) {
      $scope.userDetails = response;
      $location.path("/home");
      $mdToast.show(
        $mdToast.simple()
        .textContent('User sucessfully logged in!')
        .position('bottom right')
        .hideDelay(3000)
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
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Drama",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FF8A65",
                "href":"#!/drama",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Photography and Films",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#E64A19",
                "href":"#!/pfc",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Fine Arts and Crafts",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#43A047",
                "href":"#!/fac",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Music",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#512DA8",
                "href":"#!/music",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Debate and MUN",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#4A148C",
                "href":"#!/debate",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Literary",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#ef5350",
                "href":"#!/literary",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Quiz",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#536DFE",
                "href":"#!/quiz",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Hindi Samiti",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#00ACC1",
                "href":"#!/hindi",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Magic",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#00695C",
                "href":"#!/magic",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Comedy",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#424242",
                "href":"#!/comedy",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Glamour",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FFECB3",
                "href":"#!/glamour",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Adventure",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#ff1744",
                "href":"#!/adventure",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Culinary",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FF8F00",
                "href":"#!/culinary",
                "image":"url('images/pic01.jpg')"
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







});

app.controller('RegisterCtrl', function($scope, $document,$timeout, $log,$mdToast,$http,$mdDialog,$rootScope,$window,$location,Auth) {

  $scope.userDetails = Auth.getuserFullDetails();

  $rootScope.isPath= function(viewLocation) {
      return viewLocation === $location.path();
    };

  $rootScope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '../templates/otpdialog.html',
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
    };
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
          'first_name':user.firstname,
          'last_name':user.lastname,
          'password':user.password
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
        if (error.status===302){
          $mdToast.show(
            $mdToast.simple()
            .textContent('Something went wrong, Please try again!')
            .position('bottom right')
            .hideDelay(3000)
          );
        }
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
        'password':preuser.password,
        'otp':user.otp
      }
    }).then(function sucessCallback(response) {
      console.log(response);
      userFullDetails = {
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          rdv_number: response.data.user.rdv_number,
          access_token:response.data.token,
      };
      $window.localStorage.userFullDetails = JSON.stringify(userFullDetails);
      if (response.status===200){
        console.log(response);
        $location.path("/home");
        $mdToast.show(
          $mdToast.simple()
          .textContent("Successfully Logged In")
          .position('bottom right')
          .hideDelay(3000)
        );
      }
    }, function errorCallback(error) {
      if (error.status===401){
        $mdToast.show(
          $mdToast.simple()
          .textContent('Wrong OTP')
          .position('bottom right')
          .hideDelay(3000)
        );
      }
    });

  };





});
