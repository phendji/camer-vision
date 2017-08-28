/* proposition controllers*/
var app = angular.module('proposition', []);

app.controller('propositionCtrl', ['$scope', '$rootScope', 'mainServices', function($scope, $rootScope, mainServices) {
    /* init var scope*/
    $scope.user = {};
    $scope.user.newsletter = false;
    $scope.user.sexe = 'Masculin';
    $scope.sexes = ['Masculin', 'Feminin'];
    /*$scope.sexes = [
        {
          id: 1,
          label: 'Masculin'
        },
        {
          id: 2,
          label: 'Feminin'
        }
    ];*/

    //Fonction servant à limiter le nombre de caractere  dans une textarea
    $scope.maxLength = function(element, max){
        value = element.value;
        max = parseInt(max);
        if(value.length > max){
            element.value = value.substr(0, max);
        }
    };

    $scope.saveUser = function() {
        console.log("$scope.user : ", $scope.user);
        mainServices.saveUser($scope.user, function(response){
            $('#infoUserModal').modal('hide');
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
        $scope.proposition.status = false;  // Par defaut une proposition est au status 0 : Dépublier
        console.log("$scope.proposition : ", $scope.proposition);
        mainServices.saveProposition($scope.proposition, function(response){
           $('#infoUserModal').modal('show');
            switch (response.status){
                case 200:
                    $scope.user = {};
                    $scope.user.id_proposition = response.data.id;
                    $('#infoUserModal').modal('show');
                break;

                default:
                    $scope.managerErrorMsgs("errormsg", "Erreur techique, veuillez réessayer plus tard.");
            }
        })

    };

    //console.log("fooBar : ", $scope.listSousRubrique);
}]);