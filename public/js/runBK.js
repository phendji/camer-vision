(function () {
    'use strict';
/*
    var RemoteApi = location.origin + '/api';

    angular
        .module('app')
        .constant("RemoteApi" ,RemoteApi);
*/
    angular
        .module('kmerapp')
        .run(run);
/*
    function run($rootScope, $state, amMoment, $auth, $filter, $anchorScroll) {
        // Délai d'ouverture des tooltips
        $rootScope.tooltipDelay = 500;
        // Change la timeZone de Moment.js
        amMoment.changeLocale('fr');

        $anchorScroll.yOffset = 50;

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var logged = $auth.isAuthenticated();

            // Check if the user is going to the login page
            // Using ui.route so not exactly sure about this one but you get the picture
            var arr = [
                'auth'
            ];
            var allowedRoutes = $filter('filter')(arr, toState.name);

            if (allowedRoutes.length === 0 && !logged) {
                // Preventing the default behavior allows us to use $state.go
                // to change states
                $rootScope.currentUser = null;
                event.preventDefault();
                $state.go('auth');
            } else {
                $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));
            }
        });
    }
    */
})();