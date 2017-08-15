app.controller('HomeCtrl', function($scope,$document,$timeout, $mdSidenav, $log) {

$scope.chances = [
          "Once in a lifetime opportunity to meet celebrated international artists",
          "Exclusive Rendezvous merchandise and Rendezvous Pronite passes",
          "The coveted Campus Ambassador Certificate in recognition for your contribution to Rendezvous, IIT Delhi",
          "Huge discount coupons for our irresistible food joints and more",
          "Unique chance to hone your communication and people skills by interacting with people from colleges across India",
          "Exciting Internship opportunities for promising Campus Ambassadors",
          "Prizes galore including coupons, goodies and lots more awarded regularly"
];

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

});

app.controller('MainCtrl', function($scope, $document, $timeout, $mdSidenav, $log, $location, $rootScope) {
  $rootScope.isPath= function(viewLocation) {
    return viewLocation === $location.path();
  };
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }
  $scope.cancel=function() {
    $mdDialog.cancel();
  };
});
