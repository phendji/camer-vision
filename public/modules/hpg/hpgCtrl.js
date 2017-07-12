(function () {
    'use strict';

    angular
        .module('app.hpg')
        .controller('HpgCtrl', HpgCtrl);

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
    }
})();