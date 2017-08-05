var app = angular.module('boxer', ['ngMaterial','ngRoute','ngAnimate','duScroll','angular-scroll-animate','ngParallax','angular-carousel']);


// routes for the urls
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "MainCtrl",
    templateUrl: "templates/home.html"
  }).when("/competetions", {
    controller: "MainCtrl",
    templateUrl: "templates/competetion.html"
  }).when("/compevents", {
    controller: "MainCtrl",
    templateUrl: "templates/compevents.html"
  }).when("/pronites", {
    controller: "MainCtrl",
    templateUrl: "templates/pronites.html"
  }).otherwise({
    controller: "MainCtrl",
    templateUrl: "templates/error.html"
  });
}]);
