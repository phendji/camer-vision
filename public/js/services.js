var app = angular.module('kmerApp.services', []);


app.factory('mainServices', ['$http', '$rootScope',  function($http, $rootScope) {
  return {

  	saveUser: function(currentUser, callback) {
      $http({
        method: 'POST',
        url: remoteApi + "/users",
        data: currentUser
    	}).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },

    saveProposition: function(currentProposition, callback) {
      $http({
        method: 'POST',
        url: remoteApi + "/propositions",
        data: currentProposition
    	}).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    }

 	}

}]);