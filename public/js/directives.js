'use strict';

/* Directives angularjs */
var app = angular.module('kmerApp.directives', []);

/* Directive Attribute d'une balise html, appel du template pour charger le bloc menu flottant
 * @Return templateUrl <string>
 * @Auteur : phendji
 */
app.directive('navFlottant', function () {
    return {
        templateUrl: "shared/nav-flottant.html"
    };
});


/* Directive Attribute d'une balise html, appel de la fonction
 * à chaque press sur le bouton ENTREE du clavier
 * @Return function
 * @Auteur : phendji
 */
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

/* Directive Attribute, afficher en majuscule
 * @Return function
 * @Auteur : phendji
 */
app.directive('uppercase', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        function parser(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          var formatedValue = value.toUpperCase();
          if (ctrl.$viewValue !== formatedValue) {
            ctrl.$setViewValue(formatedValue);
            ctrl.$render();
          }
          return formatedValue;
        }

        function formatter(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          return value.toUpperCase();
        }

        ctrl.$formatters.push(formatter);
        ctrl.$parsers.push(parser);
      }
    };
  }
]);