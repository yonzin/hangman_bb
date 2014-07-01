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
    }
  };
  $http.get("words.json").success( function(data) {
    //send broadcast so the main controller
    //can close the loading dialog
    _words.words = data;
  });

  return _words;
});
