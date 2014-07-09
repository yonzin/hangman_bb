app.service("wordsService", function($http) {
  var _words = {
    words: null,
    getWord: function() {
      var word = '',
        index = 0;

      if(_words.words !== null && angular.isArray(_words.words)) {
        index = Math.floor((Math.random() * _words.words.length));
        word = _words.words[index];
      }
      return word;
    },
    ready: function() {
      return words !== null;
    }
  };
  $http.get("mwords.json").success( function(data) {
    //send broadcast so the main controller
    //can close the loading dialog
    _words.words = data;
  });

  return _words;
});

app.service("gameService", function($rootScope,wordsService) {
  var _game = {
    state: 0, //0 not-in-game, 1 playing, 2 finished
    word: '',
    revealedWord: '',
    lettersFound: [],
    lettersMissed: [],
    // see if letter is in word
    // trigger game end, if word
    // is found or 7 mistakes are made
    //
    // returns, -1 on new error, 1 on new hit, 0 otherwise
    check: function(letter) {
      if(_game.state !== 1) {
        return;
      }

      var word=_game.word.toLowerCase(),
        _letter=letter.toLowerCase();

      //new mistake
      if(word.indexOf(_letter) === -1 &&
        _game.lettersMissed.indexOf(_letter) === -1) {
        _game.lettersMissed.push(_letter);
        $rootScope.$broadcast("letterMiss", {
          number: _game.lettersMissed.length
        });

        if(_game.lettersMissed.length >=7){
          _game.state = 2;
          $rootScope.$broadcast("endGame", {
            word: _game.word,
            won: 'lost'
          });
        }
        return -1;
      }
      //new correct
      else if(word.indexOf(_letter) >=0 &&
        _game.lettersFound.indexOf(_letter) === -1) {
        _game.revealLetter(_letter);
        _game.lettersFound.push(_letter);
        $rootScope.$broadcast("letterHit", {
          revealedWord: _game.revealedWord
        });
        if(_game.revealedWord === _game.word) {
          _game.state = 2;
          $rootScope.$broadcast("endGame", {
            word: _game.word,
            won: 'won'
          });
        }
        return 1;
      }
      return 0;
    },
    revealLetter: function(letter) {
      var word = _game.word,
        lc_word = word.toLowerCase(),
        revealedWord = _game.revealedWord,
        newRevealed = "";

      for(var i=0;i<word.length;i++) {
        if(lc_word[i] === letter) {
          newRevealed += word[i];
        }
        else {
          newRevealed += revealedWord[i];
        }
      }
      _game.revealedWord = newRevealed;
    },
    start: function() {
      _game.clear();
      _game.state = 1;
      _game.word = wordsService.getWord();
      for(var i=0;i<_game.word.length;i++) {
        _game.revealedWord+="_";
      }
    },
    clear: function() {
      _game.state = 0;
      _game.revealedWord = '';
      _game.lettersFound = [];
      _game.lettersMissed = [];
    }

  };

  return _game;

});
