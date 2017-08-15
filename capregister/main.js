var app = angular.module('app', ['ngMaterial','ngAnimate','ngRoute','angular-scroll-animate','duScroll']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "MainCtrl",
    templateUrl: "templates/main.html"
  }).when("/home", {
    controller: "HomeCtrl",
    templateUrl: "templates/home.html"
  }).otherwise({
    controller: "MainCtrl",
    templateUrl: "templates/error.html"
  });
}]);
