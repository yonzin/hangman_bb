var app = angular.module('hangmanApp', ['ngRoute','ngAnimate']);

app.config( function($routeProvider) {

  $routeProvider.when('/game', {
    templateUrl: 'partials/game.html',
    controller: 'gameCtrl'
  });

  $routeProvider.otherwise({
    templateUrl: 'partials/main.html',
    controller: 'mainCtrl'
  });

});

app.run(
  function($location) {
    $location.path('/');
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
    }, false);
  }
);
