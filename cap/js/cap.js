app.controller('HomeCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {
  if($window.localStorage.userFullDetails){
    $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);

    console.log($scope.userFullDetails);
    var access_token = $scope.userFullDetails.access_token;
  }

$scope.init = function(){

  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'leaderboard',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':access_token
      }
    }).then(function successCallback(response) {
      $scope.leaderboardData = response.data.leaderboard;

        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });






};

$scope.init();
});

app.controller('MainCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window,$rootScope,$mdSidenav) {

  $scope.isFbSignup = true;
  $rootScope.isPath= function(viewLocation) {
    return viewLocation === $location.path();
  };
  $rootScope.logout = false;
  if($rootScope.isPath('/')===true && $scope.userDetails !=undefined && $scope.userFullDetails !=undefined && $rootScope.logout===false){
    $location.path("/home");



  }

  $scope.$on('event:social-sign-in-success', (event, userDetails)=> {
      $scope.result = userDetails;
      $window.localStorage.userDetails = JSON.stringify(userDetails);
      $scope.userDetails = userDetails;

      $scope.login();
      $scope.$apply();



    });



    if($window.localStorage.userDetails !=null){

    $scope.userDetails = JSON.parse($window.localStorage.userDetails);
      }

      if($window.localStorage.userFullDetails !=null){

      $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);
        }


    $scope.login = function(){
            $scope.isLogin = true;
      console.log($scope.isLogin);
      // if($window.localStorage.userDetails !=null){
      //   $mdToast.show(
      //     $mdToast.simple()
      //     .textContent('Please First Signup through Facebook')
      //     .position('bottom right')
      //     .hideDelay(3000)
      //   );
      //
      //   }

      if($scope.userDetails !=null){


              $http({
                  method: 'POST',
                  transformRequest: function(obj) {
                      var str = [];
                      for(var p in obj)
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                      return str.join("&");
                   },
                  url: URL_PREFIX + 'auth/facebook',
                  headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                  },
                  data:{
                      'token':$scope.userDetails.token
                  }
                }).then(function successCallback(response) {
                  $scope.isLogin = false;
                  userFullDetails = {
                      name: response.data.user.name,
                      points: Math.floor(response.data.user.points/1000000000000000),
                      email: response.data.user.email,
                      image_url:response.data.user.image_url,
                      name:response.data.user.name,
                      type:response.data.user.type,
                      submission:response.data.user.submission,
                      session_id:response.data.user.uuid,
                      access_token:response.data.token,
                      type:response.data.user.type

                  };
                    $window.localStorage.userFullDetails = JSON.stringify(userFullDetails);

                    $location.path("/home");


                    $window.location.reload();
                    $mdToast.show(
                      $mdToast.simple()
                      .textContent('Succesfully Logged In')
                      .position('bottom right')
                      .hideDelay(3000)
                    );
                    console.log(response);
                  }, function errorCallback(response) {
                    console.log(response);
                    $mdToast.show(
                      $mdToast.simple()
                      .textContent('Unauthorized User Please Send Your id to rdv17publicity@gmail.com')
                      .position('bottom right')
                      .hideDelay(3000)
                    );
                  });

                }


    };

    // if($scope.userDetails !=null){
    //   $scope.login();
    //   console.log("its working");
    // }


    if($window.localStorage.userFullDetails !=null){
    $rootScope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);

    };

    // if($scope.userFullDetails.type == 'admin'){
    //   $scope.isLogin = true;
    // }
    // else if ($scope.userFullDetails.type == 'god') {
    //   $scope.isLogin = true;
    // }
    // else {
    //   $scope.isLogin = true;
    // }

    $scope.checkTypes = function (type) {
      if(type == 'admin' || type == 'god'){
        return true;
      }
      else {
        return false;
      }

    };

    $scope.checkGod = function (type) {
      if(type == 'god'){
        return true;
      }
      else {
        return false;
      }

    };






  $rootScope.logout = function(){
    localStorage.clear();
    $location.path("/");
    $scope.storageClear = true;
    // $location.path("/");
    console.log($scope.storageClear);

  };

  $rootScope.makeLogout = function(){
    if($scope.storageClear){

      console.log("it works");
      $location.path("/");
        console.log("it again works");
    }
  };

  $rootScope.makeLogout();


  $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      };




 });

app.controller('PendingCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {

$scope.isSubmit = true;
$scope.init = function() {
  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'approve',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
        $scope.pendingData = response.data;
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
}

$scope.init();

$scope.submitPending = function(data){
  $http({
      method: 'POST',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
       data:{
         'points':data.allot_points,
         'submission_id':data.uuid
       },
      url: URL_PREFIX + 'approve',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.leaderboardData = response.data.leaderboard;
      $mdToast.show(
        $mdToast.simple()
          .textContent(response.data.message)
          .hideDelay(5000)
          .position('right bottom')
        );
        $scope.isSubmit = false;
        data.allot_points = '';
        $scope.init();

      }, function errorCallback(response) {
        console.log(response);
        $mdToast.show(
          $mdToast.simple()
            .textContent(response.data.message)
            .hideDelay(5000)
            .position('right bottom')
          );
      });


}
});

app.controller('ProfileCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window, $mdDialog,$rootScope) {

if($window.localStorage.userFullDetails){
  $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);
}


$scope.userProfile = function(){
  console.log("korkudeepak");
  // console.log($scope.userFullDetails.access_token);
  if($window.localStorage.userFullDetails){
    $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);
    var access_token = $scope.userFullDetails.access_token;
  }

  console.log("korku");
  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'profile',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':access_token
      }
    }).then(function successCallback(response) {
        $scope.userProfile = response.data.user;
        console.log(response);

        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
        // $mdToast.show(
        //   $mdToast.simple()
        //   .textContent('Something went wrong')
        //   .position('bottom right')
        //   .hideDelay(3000)
        // );
      });

};

  $scope.userProfile();


});

app.controller('SubmissionCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {

$scope.getSubmission = function(){

  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'submit',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.submissionData = response.data;

      }, function errorCallback(response) {
        console.log(response);
      });


};

$scope.getSubmission();

});

app.controller('SubmitCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window, $mdDialog,$rootScope) {
$scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);



$scope.getTasks = function(){
  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'tasks',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.taskData = response.data.tasks;
      console.log("korku tasks");
      console.log(response);

      }, function errorCallback(response) {
        console.log(response);
      });
}

$scope.getTasks();


$scope.showAdvanced = function(ev,id,type) {
      $rootScope.task_id = id;
      console.log($scope.task_id);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/'+type +'.html',
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

  $scope.createDialog = function(ev) {

      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/createDialog.html',
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

  $scope.submitTask = function (task) {
    console.log($rootScope.task_id);
    $http({
        method: 'POST',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data:{
           'task_id':$rootScope.task_id,
           'image_url':task.image_url,
           'detail':task.detail
         },
        url: URL_PREFIX + 'submit',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'x-access-token':$scope.userFullDetails.access_token
        }
      }).then(function successCallback(response) {
        $scope.leaderboardData = response.data.leaderboard;
        $mdToast.show(
          $mdToast.simple()
            .textContent(response.data.message)
            .hideDelay(5000)
            .position('right bottom')
          );
        }, function errorCallback(response) {
          console.log(response);
        });
  };

  $scope.deleteTask = function (task) {
    console.log($rootScope.task_id);
    console.log("deleteTask");
    $http({
        method: 'DELETE',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data:{
           'task_id':$rootScope.task_id

         },
        url: URL_PREFIX + 'tasks',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'x-access-token':$scope.userFullDetails.access_token
        }
      }).then(function successCallback(response) {
        $scope.leaderboardData = response.data.leaderboard;
        $mdToast.show(
          $mdToast.simple()
            .textContent(response.data.message)
            .hideDelay(5000)
            .position('right bottom')
          );
        }, function errorCallback(response) {
          console.log(response);
        });
  };

  $scope.updateTask = function (task) {
    console.log($rootScope.task_id);
    console.log("updateTask");
    var data = {};
    data['task_id'] = $rootScope.task_id;
    data['name'] = task.name;
    data['detail'] = task.details;
    data['image_url'] = task.image_url;
    $http({
        method: 'PUT',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data,
        url: URL_PREFIX + 'tasks',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'x-access-token':$scope.userFullDetails.access_token
        }
      }).then(function successCallback(response) {
        $scope.leaderboardData = response.data.leaderboard;
        $mdToast.show(
          $mdToast.simple()
            .textContent(response.data.message)
            .hideDelay(5000)
            .position('right bottom')
          );
          $window.location.reload();
        }, function errorCallback(response) {
          console.log(response);
          $mdToast.show(
            $mdToast.simple()
              .textContent(response)
              .hideDelay(5000)
              .position('right bottom')
            );
        });
  };

  $scope.createTask = function (task) {
    console.log('korku createTask');
    $http({
        method: 'POST',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data:{
           'name':task.name,
           'detail':task.details,
           'image_url':task.image_url,
           'task_id':task.task_id
         },
        url: URL_PREFIX + 'tasks',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'x-access-token':$scope.userFullDetails.access_token
        }
      }).then(function successCallback(response) {
        $scope.leaderboardData = response.data.leaderboard;
        $mdToast.show(
          $mdToast.simple()
            .textContent(response.data.message)
            .hideDelay(5000)
            .position('right bottom')
          );
          $window.location.reload();
        }, function errorCallback(response) {
          console.log(response);
          $mdToast.show(
            $mdToast.simple()
              .textContent(response.data.message)
              .hideDelay(5000)
              .position('right bottom')
            );
        });
  };
});
