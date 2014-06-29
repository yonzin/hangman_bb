app.service("wordsService", function($http) {
  var _words = {
    words: null,
    getWord: function() {
      var index = Math.floor((Math.random() * _words.words.length));
      return _words.words[index];
    }
  };
  $http.get("words.json").success( function(data) {
    _words.words = data;
  });

  return _words;
});
