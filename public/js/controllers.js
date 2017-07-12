/* main controllers*/
var app = angular.module('kmerApp.controllers', []);

app.controller('mainCtrl', ['$scope', function($scope) {

  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });

  $scope.listSousRubrique = LIST_DES_SOUS_RUBRIQUES;
  
}]);