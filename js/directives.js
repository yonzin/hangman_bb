app.directive("keyboard", function(gameService) {
  return {
    link: function(scope,element,attrs) {
      element.addClass('keyboard');
      element.on("click", function(e) {
        if(angular.element(e.target).hasClass("letter")) {
          var letter = e.target.dataset.letter;
          scope.$apply( function() {
            gameService.check(letter);
          });
        }

      });
    },
    restrict: "A",
    template: function() {
      var keys="", alphabet="abcdefghijklmnopqrstuvwxyz";
      for(var i=0; i<alphabet.length; i++) {
        keys+="<a class='letter' data-letter='"+
          alphabet[i]+"'>"+alphabet[i]+"</a>";
      }
      return keys;
    }
  };
});
