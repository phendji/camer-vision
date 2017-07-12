/*
(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($authProvider, $provide, $httpProvider, $translateProvider, $mdThemingProvider, $mdDateLocaleProvider) {
        
        appModule.config(['$locationProvider', function($locationProvider) {
          $locationProvider.hashPrefix('');
        }]);

        
        $authProvider.loginUrl = RemoteApi + "/authenticate";

        function redirectWhenLoggedOut($q, $injector) {
            return {
                responseError: function (rejection) {
                    var $state = $injector.get('$state');
                    var $rootScope = $injector.get('$rootScope');
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
                    angular.forEach(rejectionReasons, function (value, key) {
                        if (rejection.data.error === value) {
                            localStorage.removeItem('user');
                            $rootScope.authenticated = false;
                            $rootScope.currentUser = null;
                            $state.go('auth');
                        }
                    });
                    return $q.reject(rejection);
                }
            }
        }
    }
})();
*/