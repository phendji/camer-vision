/* rubrique controllers*/
var app = angular.module('rubrique', []);

app.controller('rubriqueCtrl', ['$scope', '$rootScope', '$location', 'mainServices', function($scope, $rootScope, $location, mainServices) {
    
    console.log("rubriqueCtrl");
    var urlLocation = $location.path();
    var arrayOfUrl = splitUrlLocation(urlLocation);
    
    if( arrayOfUrl && arrayOfUrl.length == 3 && arrayOfUrl[1] == "sous-rubrique"){
        var idSousRubrique = arrayOfUrl[2]-1;
        $scope.sousRubrique = $scope.listSousRubrique[idSousRubrique];
    }


     $(document).ready(function() {
        //var accordionId = "#accordion";
        //$(accordionId + ' .panel-collapse:not(".in")').collapse('show');
        var accordionId = "#collapse_1";
        $("div"+accordionId).addClass('in');
        $(accordionId).collapse('show');
        //numPanelOpen = $(accordionId + ' .collapse.in').length;
        //console.log("numPanelOpen : ", numPanelOpen);
    });
     

    /*
     * Updating likes of the proposition
     * @Return void | update scope with number of like
     * @Auteur : phendji
     */
    $scope.updateLikeOfProposition = function(idProposition) {
        mainServices.updateLike(idProposition, function(response){
            //console.log("response : ", response);
            switch (response.status){
                case 200:
                    //$scope.listDesPropositions = response.data;
                    //for sur les propositions pour le mettre à jour
                    //avec le nombre de like provenant de la base.
                break;

                default:
                    $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
            }
        });
    };

    /*
     * Updating views of the proposition
     * @Return void | update scope with number of view
     * @Auteur : phendji
     */
    $scope.updateViewOfProposition = function(idProposition) {
        mainServices.updateView(idProposition, function(response){
            //console.log("response : ", response);
            switch (response.status){
                case 200:
                    //$scope.listDesPropositions = response.data;
                    //for sur les propositions pour le mettre à jour
                    //avec le nombre de view provenant de la base.
                break;

                default:
                    $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
            }
        });
    };


}]);
