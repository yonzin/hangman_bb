app.controller('mainCtrl', function($scope,gameService,wordsService) {
  gameService.clear();
  //if wordsService.words === null (angular.isArray? )
  //show loading
  console.log('main');

});

app.controller('gameCtrl', function($scope, gameService) {
  //start a new game
  gameService.start();
  $scope.word = gameService.word;
  $scope.revealedWord= gameService.revealedWord;
  $scope.$on("revealedUpdated", function(event, args) {
    $scope.revealedWord = args.revealedWord;
  });
});
