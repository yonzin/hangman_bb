app.controller('mainCtrl', function($scope, wordsService) {
  console.log('main');

});

app.controller('gameCtrl', function($scope, wordsService) {
  //start a new game
  $scope.word = wordsService.getWord();
});
