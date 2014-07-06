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
  $scope.$on("letterHit", function(event, args) {
    $scope.revealedWord = args.revealedWord;
  });
  $scope.$on("endGame", function(event, args) {
    console.log(args);
    gameService.clear();
  });
  $scope.letters = {
    hits: gameService.lettersFound,
    misses: gameService.lettersMissed
  };
});
