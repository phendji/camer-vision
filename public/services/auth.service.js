(function () {
    'use strict';

    angular.module("app").factory('authService', service);

    function service($http, $rootScope, $auth, $q, RemoteApi) {

        var service = {
            login: login,
            logout: logout,
            unsetUser: unsetUser,
            setUser: setUser
        };

        return service;

        function login(credentials) {
            return $auth.login(credentials).then(function () {
                return $http.get(RemoteApi + "/authenticate/user").then(function (response) {
                    return response.data;
                });
            }, function (error) {
                return $q.reject(error.data);
            });
        }

        function logout() {
            return $auth.logout().then(function () {
                unsetUser();
            });
        }

        function setUser(response) {
            var user = JSON.stringify(response.user);
            localStorage.setItem('user', user);
            $rootScope.authenticated = true;
            $rootScope.currentUser = response.user;
        }

        function unsetUser() {
            localStorage.removeItem('user');
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
        }
    }
})();
