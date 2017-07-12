(function () {
    'use strict';

    angular
        .module('kmerApp')
        .config(route);

    function route($stateProvider, $urlRouterProvider) {
        $stateProvider.state('kmerApp', {
            url: '/app',
            abstract: true,
            templateUrl: 'modules/menu/menu.html',
            controller: "MenuCtrl as menu"
        }).state('home', {
            url: '/',
            templateUrl: 'modules/home/home.html',
            controller: "HomeCtrl as homeCtrl"
        }).state('app.hpg', {
            url: '/hpg/list',
            templateUrl: 'modules/hpg/hpg.html',
            controller: "HpgCtrl as hpgCtrl"
        }).state('app.hpg-edit', {
            url: '/hpg/{id:int}',
            templateUrl: 'modules/hpg/edit/hpgEdit.html',
            controller: "HpgEditCtrl as hpgeCtrl",
            resolve: {
                hpg : function ($stateParams,hpgService) {
                    return hpgService.get($stateParams.id).then(function (response) {
                        return response;
                    });
                }
            }
        });

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("home");
        });
    }
})();