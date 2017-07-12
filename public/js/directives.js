'use strict';

/* Directives angularjs */
var app = angular.module('linsigApp.directives', []);

/* Directive Attribute d'une balise html, appel du template du bloc recherche
 * @Return templateUrl <string>
 * @Auteur : phendji
 */
app.directive('searchTemplate', function () {
    return {
        templateUrl: "components/search/templates/home.html"
    };
});

/* Directive Attribute d'une balise html, appel du template du bloc navigation
 * @Return templateUrl <string>
 * @Auteur : phendji
 */
app.directive('navTemplate', function () {
    return {
        templateUrl: "components/nav/templates/home.html"
    };
});

/* Directive Attribute d'une balise html, appel du template du bloc authentification
 * @Return templateUrl <string>
 * @Auteur : phendji
 */
app.directive('authenTemplate', function () {
    return {
        templateUrl: "components/authen/templates/home.html"
    };
});


/* Directive Attribute d'une balise html, appel du template du bloc exploreur réseau
 * @Return templateUrl <string>
 * @Auteur : phendji
 */
app.directive('explorTemplate', function () {
    return {
        templateUrl: "components/explor/templates/home.html"
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

/* Directive Attribute, lancer le spinner sur les requêtes
 * @Return function
 * @Auteur : phendji
 */
app.directive('usSpinner',   ['$http', '$rootScope' ,function ($http, $rootScope){
    return {
        link: function (scope, elm, attrs)
        {
            if(attrs.$attr.usSpinnerStandalone) return;
            $rootScope.spinnerActive = false;
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (loading)
            {
                $rootScope.spinnerActive = loading;
                if(loading){
                    elm.removeClass('ng-hide');
                }else{
                    elm.addClass('ng-hide');
                }
            });
        }
    };
}]);

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