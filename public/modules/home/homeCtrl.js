/* home controllers*/
var app = angular.module('home', []);

app.controller('homeCtrl', ['$scope', '$rootScope', '$location', 'mainServices', function($scope, $rootScope, $location, mainServices) {
    
  
  /*
   * Récupérer les six propositions les plus likés
   * @Return void | maj du model avec les six propositions les plus likés
   * @Auteur : phendji
   */
  $scope.homePropositions = function() {
    mainServices.getSixPropositionWithMostLike(function(response){
      switch (response.status){
        case 200:
          $scope.propositionMostLike = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    })
  };

  $scope.expandedAccordion = function(proposition){
    $location.path('sous-rubrique/'+proposition.id_theme);
  }

  // Exécuter la fonction lors de l'instanciation du module Home 
  $scope.homePropositions();

}]);