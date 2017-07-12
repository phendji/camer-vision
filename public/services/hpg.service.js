(function () {
    'use strict';

    angular.module("app").factory('hpgService', service);

    function service($http, $q, RemoteApi) {

        var service = {
            save: save,
            list: list
        };

        return service;

        
        function save(data) {
            return $http.post(RemoteApi + "/users", data).then(function (response) {
                return response.data;
            }, function (error) {
                return $q.reject(error.data);
            });
        }

        function list() {
            return $http.get(RemoteApi + "/users").then(function (response) {
                return response.data;
            }, function (error) {
                return $q.reject(error.data);
            });
        }
    }
})();
