/* rubrique controllers*/
var app = angular.module('rubrique', []);

app.controller('rubriqueCtrl', ['$scope', '$rootScope', '$location', 'mainServices', function($scope, $rootScope, $location, mainServices) {
    
    var urlLocation = $location.path();
    var arrayOfUrl = splitUrlLocation(urlLocation);
    
    if( arrayOfUrl && arrayOfUrl.length == 3 && arrayOfUrl[1] == "sous-rubrique"){
        var idTheme = arrayOfUrl[2];
        $scope.sousRubrique = $scope.listSousRubrique[idTheme];
    }

    $scope.allPropositionsByTheme = function() {
        //idTheme : 
        mainServices.getListPropositionsByTheme(idTheme, function(response){
            console.log("response theme : ", response);
            switch (response.status){
                case 200:
                    $scope.propositionsLinkToTheme = response.data;
                break;

                default:
                    $scope.managerErrorMsgs("infomsg", "ERROR");
            }
        });
    };


    $scope.allPropositionsByTheme();

    /*
     * Updating likes of the proposition
     * @Return void | update scope with number of like
     * @Auteur : phendji
     */
    $scope.updateLikeOfProposition = function(idProposition) {
        mainServices.updateLike(idProposition, function(response){
            console.log("response : ", response);
            switch (response.status){
                case 200:
                    $scope.managerErrorMsgs("infomsg", response.data);
                break;

                default:
                    $scope.managerErrorMsgs("infomsg", response.data);
            }
        });
    };

     /*
     * Updating likes of the proposition
     * @Return void | update scope with number of like
     * @Auteur : phendji
     *
    $scope.updateViewOfProposition = function(idProposition) {
        mainServices.updateView(idProposition, function(response){
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
    };*/

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
