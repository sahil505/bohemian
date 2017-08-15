var app = angular.module('app', ['ngMaterial','ngAnimate','ngRoute','socialLogin']);

var URL_PREFIX = 'http://rdv-iitd.com/api/cap/';
// var URL_PREFIX = 'http://10.194.22.16:8080/api/cap/';

var RDV_APP_ID="1908623399418269";





app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "MainCtrl",
    templateUrl: "templates/login.html"
  }).when("/home", {
    controller: "HomeCtrl",
    templateUrl: "templates/home.html"
  }).when("/submit", {
    controller: "HomeCtrl",
    templateUrl: "templates/submit.html"
  }).when("/pending", {
    controller: "PendingCtrl",
    templateUrl: "templates/pending.html"
  }).when("/submissions", {
    controller: "SubmissionCtrl",
    templateUrl: "templates/submissions.html"
  }).otherwise({
    controller: "MainCtrl",
    templateUrl: "templates/error.html"
  });
}]);

app.config(function(socialProvider){

  socialProvider.setFbKey({appId: RDV_APP_ID, apiVersion: "v2.7"});
});


// app.factory("Auth", ["$http","$q","$window", function ($http, $q, $window) {
//   var userDetails;
//   function login(){
//     hello.init({
//       facebook: 1908623399418269,
//     }, {
//       redirect_uri: 'http://localhost:7070/'
//     });
//     hello.on('auth.login', function (auth) {
//       hello(auth.network).api('/me').then(function (r) {
//       var  socialToken = auth.authResponse.access_token;
//         console.log('socialToken', socialToken);
//
//       });
//
//     });
//
//     userDetails = {
//         social_token:socialToken
//     };
//     $window.localStorage.userDetails = JSON.stringify(userDetails);
//   };
//
//     function getData() {
//         var url=URL_PREFIX+'api/login/';
//         var deferred = $q.defer();
//         $http({
//             method: 'POST',
//             transformRequest: function(obj) {
//                 var str = [];
//                 for(var p in obj)
//                 str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                 return str.join("&");
//              },
//             url: URL_PREFIX + 'api/auth/facebook',
//             headers:{
//               'Content-Type':'application/x-www-form-urlencoded'
//             },
//             data:{
//                 'token':socialToken
//             }
//           }).then(function successCallback(response) {
//               console.log(response);
//             }, function errorCallback(response) {
//               console.log(response);
//             });
//
//         };
//
//
//
//     return {
//         login: login,
//         getData: getData
//
//     };
// }]);
