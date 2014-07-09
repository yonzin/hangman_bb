app.controller('mainCtrl', function($scope,gameService,wordsService) {
  gameService.clear();
  //if wordsService.words === null (angular.isArray? )
  //show loading
});

app.controller('gameCtrl', function($scope, gameService) {
  $scope.$on("letterHit", function(event, args) {
    $scope.revealedWord = args.revealedWord;
  });
  $scope.$on("letterMiss", function(event, args) {
    $scope.image= "img/"+args.number+".png";
  });
  $scope.$on("endGame", function(event, args) {
    $scope.revealedWord= args.word;
    $scope.popup=true;
    $scope.end=args.won;
    gameService.clear();
  });
  $scope.newGame = function() {
    gameService.start();
    $scope.popup=false;
    $scope.end='';
    $scope.word = gameService.word;
    $scope.image = "img/0.png";
    $scope.revealedWord= gameService.revealedWord;
    $scope.letters = {
      hits: gameService.lettersFound,
      misses: gameService.lettersMissed
    };
  };
  $scope.openPopup = function() {
    $scope.popup=true;
  };
  $scope.closePopup = function() {
    $scope.popup=false;
  };
  //start a new game
  $scope.newGame();
});
