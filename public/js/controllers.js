/* main controllers*/
var app = angular.module('kmerApp.controllers', []);

app.controller('mainCtrl', ['$scope', '$rootScope', 'mainServices', function($scope, $rootScope, mainServices) {

  
  $scope.contact = {}; //init var
  $scope.mailIsSend = false;

  //Liste des sous rubriques
  $scope.listSousRubrique = LIST_DES_SOUS_RUBRIQUES;

  $scope.maxCaracteresProblematique = MAX_CARACTERES_PROBLEMATIQUE;
  $scope.maxCaracteresSolution = MAX_CARACTERES_SOLUTION;


  /*
   * Liste des propositions.
   * @Return array of object
   * @Auteur : phendji
   */
  $scope.listProposition = function() {
    mainServices.getListProposition(function(response){
      //console.log("response : ", response);
      switch (response.status){
        case 200:
          $scope.listDesPropositions = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    });
  };

   /*
   * Liste des propositions id_user null.
   * @Return array of object
   * @Auteur : phendji
   */
  $scope.listPropositionNull = function() {
    mainServices.getListPropositionWhereNull(function(response){
      switch (response.status){
        case 200:
          $scope.listDesPropositionsNull = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    });
  };

   $scope.listPropositionWithIdUserAndStatusNotNull = function() {
    mainServices.getAllPropositionWithIdUserAndStatusIsNotNull(function(response){
      switch (response.status){
        case 200:
          $scope.persitancePropositions = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    });
  };

  //$scope.listProposition();
  $scope.listPropositionNull();
  $scope.listPropositionWithIdUserAndStatusNotNull();

  $scope.sendEmailContact = function(){
    mainServices.sendContactByEmail($scope.contact, function(response){
      switch (response.status){
        case 200:
          $scope.mailIsSend = true;
          $scope.managerErrorMsgs("sucessmsg", response.data);
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique. Le mail n'a pas été envoyé, veuillez réessayer plus tard.");
      }
    });
  };

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

  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });
  
}]);