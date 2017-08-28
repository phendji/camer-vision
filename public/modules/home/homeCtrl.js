/* home controllers*/
var app = angular.module('home', []);

app.controller('homeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    console.log("homeCtrl");
    console.log("$scope.listDesPropositions : ", $scope.listDesPropositions);
    console.log("$scope.listSousRubrique : ", $scope.listSousRubrique);

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