/* main controllers*/
var app = angular.module('kmerApp.controllers', []);

app.controller('mainCtrl', ['$scope', function($scope) {

  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });

  /*
   * Gestion des messages d'erreur.
   * @Params : 
   *  - typeError <String>: errormsg, sucessmsg, infomsg, class css. 
   *  - comment : <String>le commentaire à afficher pour ce type d'erreur.
   * @Return void
   * @Auteur : phendji
   */
  $scope.managerErrorMsgs = function(typeError, comment){
    $('.viewerErrorMsg').notify(comment, {
      style: 'managermsgs',
      className: typeError,
      showAnimation: "slideDown",
      autoHideDelay: 7000,
      autoHide: true
    });
  }

  $scope.listSousRubrique = LIST_DES_SOUS_RUBRIQUES;
  
}]);