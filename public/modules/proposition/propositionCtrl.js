/* proposition controllers*/
var app = angular.module('proposition', []);

app.controller('propositionCtrl', ['$scope', '$rootScope', 'mainServices', function($scope, $rootScope, mainServices) {

    $scope.saveUser = function() {
        $scope.user.id_proposition = "12";
        mainServices.saveUser($scope.user, function(response){
            $('#myModal').modal('hide');
            switch (response.status){
                case 200:
                    $scope.managerErrorMsgs("sucessmsg", "Merci de votre participation, vos données ont été bien enregistrées.");
                break;

                default:
                    $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
            }
        })
    };

    $scope.saveProposition = function() {
        $scope.proposition.id_user = 0;
        mainServices.saveProposition($scope.proposition, function(response){
           $('#myModal').modal('show');
            switch (response.status){
                case 200:
                    $('#myModal').modal('show');
                break;

                default:
                    $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
            }
        })

    };

    //console.log("fooBar : ", $scope.listSousRubrique);
}]);