app.directive("keyboard", function(gameService) {
  return {
    link: function(scope,element,attrs) {
      element.addClass('keyboard');
      element.on("click", function(e) {
        if(angular.element(e.target).hasClass("letter")) {
          var letter = e.target.dataset.letter,
            _check = 0;
          scope.$apply( function() {
            _check = gameService.check(letter);
          });
        }
      });
      scope.$watch('hits', function(newVal, oldVal) {
        var _newVal = JSON.parse(newVal),
          class_rem_arr=element.attr("class")
            .match(/success-[a-z]/g),
          class_rem = ( class_rem_arr? class_rem_arr.join(" "): ""),
          class_add = "";

        for(var i=0; i<_newVal.length; i++) {
          class_add += "success-"+_newVal[i]+" ";
        }
        element.removeClass(class_rem)
          .addClass(class_add);
      });
      scope.$watch('misses', function(newVal, oldVal) {
        var _newVal = JSON.parse(newVal),
          class_rem_arr=element.attr("class")
            .match(/fail-[a-z]/g),
          class_rem = ( class_rem_arr? class_rem_arr.join(" "): ""),
          class_add = "";

        for(var i=0; i<_newVal.length; i++) {
          class_add += "fail-"+_newVal[i]+" ";
        }
        element.removeClass(class_rem)
          .addClass(class_add);
      });
    },
    scope: {
      hits: '@hits',
      misses: '@misses'
    },
    restrict: "A",
    template: function() {
      var keys="", alphabet="abcdefghijklmnopqrstuvwxyz";
      for(var i=0; i<alphabet.length; i++) {
        keys+="<a class='letter letter-"+
          alphabet[i]+"' data-letter='"+
          alphabet[i]+"' draggable='false'>"+alphabet[i]+"</a>";
      }
      return keys;
    }
  };
});

app.directive("container", function($window) {
  return {
    link: function(scope, element, attrs) {
      var _timeout = 0;
      angular.element($window).on("resize", function(res) {
        clearTimeout(_timeout);
        _timeout = setTimeout( function() {
          element.css("height",$window.innerHeight+"px");
        }, 2500);
      });
      element.css("height",$window.innerHeight+"px");
    },
    restrict: 'C'
  };
});

app.directive("adscript", function($window) {
  return {
    link: function(scope, element, attrs) {
      var iframe_a = $('#scripttag_a iframe').detach();
      var iframe_b = $('#scripttag_b iframe').detach();
      element.append(iframe_a);
      element.append(iframe_b);
      iframe_a.css("position","relative");
      iframe_a.css("top","10px");
      iframe_b.css("position","relative");
      iframe_b.css("top","20px");
    },
    restrict: 'A'
  };
});
