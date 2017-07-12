(function () {
    angular.module("app.toaster")
        .factory('toaster', function ($mdToast) {
            var o = {
                confirm: function showCustomToast(toasterClass, message, name) {
                    $mdToast.show({
                        hideDelay: 3000,
                        position: 'bottom right',
                        controller: 'ToastCtrl as tcpc',
                        templateUrl: 'modules/utils/toaster/toaster.html',
                        toastClass: toasterClass,
                        locals: {
                            data: {
                                message: message,
                                name: name
                            }
                        }
                    });
                },
                error: function showCustomToast(message, errorMessage, studentError, lastSuccess) {
                    $mdToast.show({
                        hideDelay: 3000000,
                        position: 'bottom right',
                        controller: 'ToastCtrl as tcpc',
                        templateUrl: 'modules/utils/toaster/toasterError.html',
                        locals: {
                            data: {
                                message: message,
                                errorMessage: errorMessage,
                                lastSuccess: lastSuccess,
                                studentError: studentError
                            }
                        }
                    });
                }
            };
            return o;
        });
})();