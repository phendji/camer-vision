(function () {
    'use strict';

    angular
        .module('app.popup')
        .controller('PopUpCommentCtrl', Controller);

    function Controller(comment, student, $mdDialog) {
        var vm = this;
        vm.comment = comment;
        vm.student = student;
        vm.cancel = cancel;
        vm.hide = hide;

        function cancel() {
            $mdDialog.cancel();
        }

        function hide() {
            $mdDialog.hide(vm.comment);
        }
    }
})();