'use strict';
/*
 * Déclaration des modules
 * @Return void
 * @Auteur : phendji
 */
var app = angular.module('kmerApp', 
                              	[  
                                  /*'linsigApp.directives',
                                  'linsigApp.services',
                                  'angularSpinner',
                                  'searchModule',
                                  'navModule',
                                  'explorModule',
                                  'authModule',*/
                                  'kmerApp.controllers',
                                  'kmerApp.services',
                                  'ngRoute',
                                  'home',
                                  'who',
                                  'horizons',
                                  'proposition',
                                  'cameroun',
                                  'rubrique'
                              	]);

/*
  * Définition des classes pour les types de messages d'erreur.
  * @Return void
  * @Auteur : phendji
  */
$.notify.addStyle('managermsgs', {
  html: "<div><span data-notify-text/></div>",
  classes: {
    base: {},
    errormsg: {},
    sucessmsg: {},
    infomsg: {},
    warningmsg: {}
  }
});

/*
 * Correspondance views, controller and Url.
 * @params : $routeProvider see doc (https://docs.angularjs.org/api/ngRoute/provider/$routeProvider)
 * @Return void
 * @Auteur : phendji
 */
app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/qui-sommes-nous', {
      controller: 'whoCtrl',
      templateUrl: 'modules/who/who.html'
    })

    .when('/propositions-horizons-2035', {
      controller: 'horizonsCtrl',
      templateUrl: 'modules/horizons/horizons.html'
    })

    .when('/ma-proposition', {
      controller: 'propositionCtrl',
      templateUrl: 'modules/proposition/proposition.html'
    })

    .when('/le-cameroun', {
      controller: 'camerounCtrl',
      templateUrl: 'modules/cameroun/cameroun.html'
    })

    .when('/documentation', {
      controller: 'camerounCtrl',
      templateUrl: 'modules/cameroun/cameroun.html'
    })

    .when('/sous-rubrique/:id', {
      controller: 'rubriqueCtrl',
      templateUrl: 'modules/rubrique/rubrique.html'
    })

    .when('/', {
      controller: 'homeCtrl',
      templateUrl: 'modules/home/home.html'
    })

    .otherwise({ redirectTo: '/404' });
}]);