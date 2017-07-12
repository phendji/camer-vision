(function () {
    'use strict';

    angular
        .module('app.toaster')
        .controller('ToastCtrl', Controller);

    function Controller(data, $mdToast) {
        var isDlgOpen;
        var vm = this;
        vm.data = data;

        vm.closeToast = function() {
            if (isDlgOpen) return;
            $mdToast
                .hide()
                .then(function() {
                    isDlgOpen = false;
                });
        };
    }
})();