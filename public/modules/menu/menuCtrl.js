(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl(authService, $state, $mdSidenav) {

        var vm = this;
        vm.toggleSidenav = toggleSidenav;
        vm.logout = logout;

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }

        function logout() {
            authService.logout().then(function () {
                $state.go('auth');
            });
        }
    }

})();