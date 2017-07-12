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
                                  'linsigApp.controllers',
                                  'angularSpinner',
                                  'searchModule',
                                  'navModule',
                                  'explorModule',
                                  'authModule',*/
                                  'ngRoute',
                                  'home',
                                  'who',
                                  'horizons',
                                  'proposition'
                              	]);

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

    .when('/', {
      controller: 'homeCtrl',
      templateUrl: 'modules/home/home.html'
    })

    .otherwise({ redirectTo: '/404' });
}]);