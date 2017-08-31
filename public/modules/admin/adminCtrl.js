/* admin controllers*/
var app = angular.module('admin', []);

app.controller('adminCtrl', ['$scope', '$rootScope', 'mainServices', function($scope, $rootScope, mainServices) {
  console.log("admin page");

   $scope.allPropositions = function() {
    mainServices.getAllPropositionWithIdUserIsNotNull(function(response){
      console.log("proposition with idUser <> null ", response);
      switch (response.status){
        case 200:
          $scope.propositionIdUserNotNull = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    }),
    mainServices.getAllPropositionWithIdUserIsNull(function(response){
      console.log("proposition with idUser == null ", response);
      switch (response.status){
        case 200:
          $scope.propositionIdUserNull = response.data;
        break;

        default:
          $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
      }
    })
  };

  $scope.allPropositions();

  /*
     * Gestion de l'affichage des blocs de navivation.
     * @onglet <string> : tag sur element cliqué.
     * @Return void
     * @Auteur : phendji
     */
    $scope.resetNav = function(onglet){
      switch (onglet) {
        case 'ong1':
         console.log("hendji : ", onglet)
          $("#viewerDashboardProposition").css("display", "block");
          $("#viewerDashboardContributeurs").css("display", "none");
          break;

        case 'ong2':
         console.log("pat : ", onglet)
          $("#viewerDashboardContributeurs").css("display", "block");
          $("#viewerDashboardProposition").css("display", "block");
          break;

        default:
          $("#viewerDashboardProposition").css("display", "block");
          $("#viewerDashboardContributeurs").css("display", "none");
          break;
        }
    };


  $scope.viewDetailProposition = function(proposition) {
    $('#modalViewProposition').modal('show');
    console.log("proposition : ", proposition);
    $scope.modal = {};
    $scope.modal = proposition;
    /*$scope.modal.problematique = proposition.problematique;
    $scope.modal.solution = proposition.solution;
    $scope.modal.status = proposition.status;*/
  }

  $scope.updatePropositionByAdmin = function(){
    //call service pour mettre à jour les données en bases
    console.log("modal : ", $scope.modal);
  }

  //Page-Level Demo Scripts - Tables - Use for reference
	$(document).ready(function() {
    $('#dataTables-proposition').DataTable({
      responsive: true,
      language: {
        processing:     "Traitement en cours...",
        search:         "Rechercher&nbsp;:",
        lengthMenu:     "Afficher _MENU_ &eacute;l&eacute;ments",
        info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix:    "",
        loadingRecords: "Chargement en cours...",
        zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable:     "Aucune donnée disponible dans le tableau",
        paginate: {
          first:      "Premier",
          previous:   "Pr&eacute;c&eacute;dent",
          next:       "Suivant",
          last:       "Dernier"
        },
        aria: {
          sortAscending:  ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
      }
    });
	});

}]);