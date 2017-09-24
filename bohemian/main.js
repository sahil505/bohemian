var app = angular.module('boxer', ['ngMaterial','ngRoute','ngAnimate','duScroll','angular-scroll-animate','ngParallax','angular-carousel','ngSanitize','ngMd5']);

var URL_PREFIX = 'http://rdv-iitd.com/api/'

var REGISTER_PATH = '/home';
// routes for the urls
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "MainCtrl",
    templateUrl: "templates/home.html"
  }).when("/home", {
    controller: "MainCtrl",
    templateUrl: "templates/home.html"
  }).when("/register", {
    controller: "RegisterCtrl",
    templateUrl: "templates/register.html"
  }).when("/login", {
    controller: "MainCtrl",
    templateUrl: "templates/login.html"
  }).when("/compevents", {
    controller: "MainCtrl",
    templateUrl: "templates/compevents.html"
  }).when("/pronites", {
    controller: "MainCtrl",
    templateUrl: "templates/pronites.html"
  }).when("/dance", {
    controller: "DanceCtrl",
    templateUrl: "templates/dance.html"
  }).when("/music", {
    controller: "MusicCtrl",
    templateUrl: "templates/music.html"
  }).when("/drama", {
    controller: "DramaCtrl",
    templateUrl: "templates/drama.html"
  }).when("/pfc", {
    controller: "PfcCtrl",
    templateUrl: "templates/pfc.html"
  }).when("/adventure", {
    controller: "AdventureCtrl",
    templateUrl: "templates/adventure.html"
  }).when("/quiz", {
    controller: "QuizCtrl",
    templateUrl: "templates/quiz.html"
  }).when("/culinary", {
    controller: "CulinaryCtrl",
    templateUrl: "templates/culinary.html"
  }).when("/magic", {
    controller: "MagicCtrl",
    templateUrl: "templates/magic.html"
  }).when("/literary", {
    controller: "LiteraryCtrl",
    templateUrl: "templates/literary.html"
  }).when("/glamour", {
    controller: "GlamourCtrl",
    templateUrl: "templates/glamour.html"
  }).when("/hindi", {
    controller: "HindiCtrl",
    templateUrl: "templates/hindi.html"
  }).when("/debate", {
    controller: "DebateCtrl",
    templateUrl: "templates/debate.html"
  }).when("/fac", {
    controller: "FacCtrl",
    templateUrl: "templates/fac.html"
  }).when("/comedy", {
    controller: "ComedyCtrl",
    templateUrl: "templates/comedy.html"
  }).when("/coming", {
    controller: "MainCtrl",
    templateUrl: "templates/comingsoon.html"
  }).when("/sports", {
    controller: "SportsCtrl",
    templateUrl: "templates/adventure_sports.html"
  }).when("/professional", {
    controller: "ProfessionalCtrl",
    templateUrl: "templates/professional.html"
  }).when("/informal", {
    controller: "InformalCtrl",
    templateUrl: "templates/informal.html"
  }).otherwise({
    controller: "MainCtrl",
    templateUrl: "templates/error.html"
  });
}]);



app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userFullDetails) {
        console.log(userFullDetails);
    });
    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/");
        }
    });
}]);
app.factory("Auth", ["$http","$q","$window","md5",function ($http, $q, $window,md5) {
    var userFullDetails;
    function login(user) {
        var url=URL_PREFIX+'login/';
        var deferred = $q.defer();
        $http({
             method: "POST",
            //  transformRequest: function(obj) {
            //     var str = [];
            //     for(var p in obj)
            //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //     return str.join("&");
            //  },
             data: {
                'login_id':user.username,
                'password':md5.createHash(user.password)

             },
             headers: {
                'Content-Type': 'application/json; charset=UTF-8'
              },
             url: url,
           }).then(function successCallback(response) {
             isLoading = false;
             console.log(response);
             userFullDetails = {
                 first_name: response.data.user.first_name,
                 last_name: response.data.user.last_name,
                 rdv_number: response.data.user.rdv_number,
                 access_token:response.data.token,
                 points:response.data.user.rdv_points
             };
             $window.localStorage.userFullDetails = JSON.stringify(userFullDetails);
             deferred.resolve(userFullDetails);
           }, function errorCallback(error) {
             deferred.reject(error);
         });
         return deferred.promise;
    };

    function logout() {
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: URL_PREFIX+"logout/",
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization':'Token '+userFullDetails.access_token
            }
        }).then(function successCallback(response) {
            // console.log(result);
            userFullDetails = null;
            $window.localStorage.userFullDetails = null;
            deferred.resolve(result);
        }, function errorCallback(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    function getuserFullDetails() {
        return userFullDetails;
    }
    function init() {
        if ($window.localStorage.userFullDetails) {
            userFullDetails = JSON.parse($window.localStorage.userFullDetails);
        }
    }
    init();
    return {
        login: login,
        logout: logout,
        getuserFullDetails: getuserFullDetails
    };
}]);


// app.directive('focusMe', function(){
//   return function($scope, element, attr){
//     if($scope.$eval(attr.focusMe)){
//        element[0].focus();
//     }
//   };
// });
