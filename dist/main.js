var app = angular.module('boxer', ['ngMaterial','ngRoute','ngAnimate','duScroll','angular-scroll-animate','ngParallax','angular-carousel']);

var URL_PREFIX = 'http://rdv-iitd.com/api/'
// routes for the urls
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "MainCtrl",
    templateUrl: "templates/login.html"
  }).when("/register", {
    controller: "RegisterCtrl",
    templateUrl: "templates/register.html"
  }).when("/home", {
    controller: "MainCtrl",
    templateUrl: "templates/home.html"
  }).when("/compevents", {
    controller: "MainCtrl",
    templateUrl: "templates/compevents.html"
  }).when("/pronites", {
    controller: "MainCtrl",
    templateUrl: "templates/pronites.html"
  }).when("/dance", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/dance.html"
  }).when("/music", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/music.html"
  }).when("/drama", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/drama.html"
  }).when("/pfc", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/pfc.html"
  }).when("/adventure", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/adventure.html"
  }).when("/quiz", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/quiz.html"
  }).when("/culinary", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/culinary.html"
  }).when("/magic", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/magic.html"
  }).when("/literary", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/literary.html"
  }).when("/glamour", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/glamour.html"
  }).when("/hindi", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/hindi.html"
  }).when("/debate", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/debate.html"
  }).when("/fac", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/fac.html"
  }).when("/comedy", {
    controller: "CompetetionCtrl",
    templateUrl: "templates/comedy.html"
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
app.factory("Auth", ["$http","$q","$window",function ($http, $q, $window) {
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
                'password':user.password

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
        }).then(function (result) {
            // console.log(result);
            userFullDetails = null;
            $window.localStorage.userFullDetails = null;
            deferred.resolve(result);
        }, function (error) {
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
