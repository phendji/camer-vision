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

    /**
     * Obtenir les 06 propositions les plus likés
     * Utilisé pour afficher les six propositions sur la page Home et 
     * les 02 propositions sur la page ma-proposition
     * return callback function
     */
    getSixPropositionWithMostLike: function(callback){
      $http({
        method: 'GET',
        url: remoteApi + "/propositions/mostLike"
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },

     /**
     * Obtenir toutes les propositions ayant un id_user != null
     * Utilisé pour afficher les propositions sur la page admin
     * return callback function
     */
    getAllPropositionWithIdUserIsNotNull: function(callback){
      $http({
        method: 'GET',
        url: remoteApi + "/propositions/idUserNotNull"
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },


     /**
     * Obtenir toutes les propositions ayant un id_user != null
     * Utilisé pour afficher les propositions sur la page admin
     * return callback function
     */
    getAllPropositionWithIdUserAndStatusIsNotNull: function(callback){
      $http({
        method: 'GET',
        url: remoteApi + "/propositions/idUserAndStatusNotNull"
      }).then(function successCallback(response) {
        //Appel asynchrone, quand la réponse est success
        callback(response);
        }, function errorCallback(response) {
        callback(response)
      });
    },


     /**
     * Obtenir toutes les propositions ayant un id_user == null
     * Utilisé pour afficher les propositions sur la page admin
     * return callback function
     */
    getAllPropositionWithIdUserIsNull: function(callback){
      $http({
        method: 'GET',
        url: remoteApi + "/propositions/idUserNull"
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

    getListPropositionWhereNull: function(callback){
      $http({
        method: 'GET',
        url: remoteApi + "/propositions/indexNull"
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