/* home controllers*/
var app = angular.module('home', []);

app.controller('homeCtrl', ['$scope', '$rootScope', 'mainServices', function($scope, $rootScope, mainServices) {
    
  console.log("homeCtrl");
  // console.log("$scope.listDesPropositions : ", $scope.listDesPropositions);
  // console.log("$scope.listSousRubrique : ", $scope.listSousRubrique);

  $scope.homePropositions = function() {
    mainServices.getSixPropositionWithMostLike(function(response){
      console.log("home six proposition ", response);
      switch (response.status){
        case 200:
          $scope.propositionMostLike = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    })
  };

  // Appel des fonctions definir plus haut afin d'initialiser le scope(Model)
  $scope.homePropositions();

    $scope.expandedAccordion = function(idProposition){
      console.log("idProposition : ", idProposition);

      $(document).ready(function() {
        //removeClass();
          var accordionId = "#accordion";
          $(accordionId + ' .panel-collapse:not(".in")').collapse('show');
         var accordionId = "#collapse_1";
         $("div"+accordionId).addClass('in');
         $(accordionId).collapse('show');
          numPanelOpen = $(accordionId + ' .collapse.in').length;
          console.log("numPanelOpen : ", numPanelOpen);
      });

  
  

   /* $(".toggle-accordion").on("click", function() {
      var accordionId = $(this).attr("accordion-id"),
        numPanelOpen = $(accordionId + ' .collapse.in').length;
      
      $(this).toggleClass("active");

      if (numPanelOpen == 0) {
        openAllPanels(accordionId);
      } else {
        closeAllPanels(accordionId);
      }
    })

    openAllPanels = function(aId) {
      console.log("setAllPanelOpen");
      $(aId + ' .panel-collapse:not(".in")').collapse('show');
    }
    closeAllPanels = function(aId) {
      console.log("setAllPanelclose");
      $(aId + ' .panel-collapse.in').collapse('hide');
    }
       
  });*/
  }
}]);