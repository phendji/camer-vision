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
    },

    getListProposition: function(callback){
      $http({
        method: 'GET',
        url: remoteApi + "/propositions"
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },

    sendContactByEmail: function(contact, callback) {
      $http({
        method: 'POST',
        url: remoteApi + "/send",
        data: contact
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },

    updateLike: function(idProposition, callback){
      $http({
        method: 'PUT',
        url: remoteApi + "/updateLike/"+idProposition
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },

    updateView: function(idProposition, callback){
      $http({
        method: 'PUT',
        url: remoteApi + "/updateView/"+idProposition
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    }

 	}

}]);