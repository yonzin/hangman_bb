app.controller('mainCtrl', function($scope, wordsService) {
  //if wordsService.words === null (angular.isArray? )
  //show loading
  console.log('main');

});

app.controller('gameCtrl', function($scope, wordsService) {
  //start a new game
  $scope.word = wordsService.getWord();
});
