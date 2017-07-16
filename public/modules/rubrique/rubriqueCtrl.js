/* rubrique controllers*/
var app = angular.module('rubrique', []);

app.controller('rubriqueCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    
    //Debug : console.log("rubriqueCtrl");
    var urlLocation = $location.path();
    var arrayOfUrl = splitUrlLocation(urlLocation);
    if( arrayOfUrl && arrayOfUrl.length == 3 && arrayOfUrl[1] == "sous-rubrique"){
        var idSousRubrique = arrayOfUrl[2]-1;
        $scope.sousRubrique = $scope.listSousRubrique[idSousRubrique];
    }

}]);

/*
(function () {
    'use strict';

    angular
        .module('home.controller')
        .controller('homeCtrl', homeCtrl);

    function HpgCtrl(hpgService) {
        var vm = this;
        vm.user = {};
        vm.users = [];
        vm.save = save;

        activate();

        function activate(){
            list();
        }

        function save() {
            vm.promiseHpgs = hpgService.save(vm.user).then(function (response) {
                vm.users = response;
            }, function (err) {
                // Toaster handle error
            });
        }

        function list(){
            hpgService.list().then(function (response) {
               vm.users =  response;
            });
        }
    
})();
}*/