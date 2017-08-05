app.controller('MainCtrl', function($scope, $document,$timeout, $log) {

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
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Drama",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FF8A65",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Photography and Films",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#E64A19",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Fine Arts and Crafts",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#43A047",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Music",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#512DA8",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Debate and MUN",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#4A148C",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Literary",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#ef5350",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Quiz",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#536DFE",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Hindi Samiti",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#00ACC1",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Magic",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#00695C",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Comedy",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#424242",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Glamour",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FFECB3",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Adventure",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#ff1744",
                "href":"#!/competetions",
                "image":"url('images/pic01.jpg')"
              },
              {
                "title":"Culinary",
                "row":1,
                "col":1,
                "class":"tile1",
                "bg":"#FF8F00",
                "href":"#!/competetions",
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
