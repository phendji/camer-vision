(function () {
    'use strict';
    angular.module('app')
        .filter('myDateFormat', function ($filter) {
            return function (text, format) {
                return $filter('date')(new Date(text), format);
            }
        }).filter('pagination', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
        };
    }).filter('capitalizeFirstLetter', function () {
        return function (input) {
            if (input) {
                input = input.toLowerCase();
                return input.substring(0, 1).toUpperCase() + input.substring(1);
            }
        }
    }).filter('ageFilter', function () {

        function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return function (birthday) {
            return calculateAge(new Date(birthday));
        };
    }).filter('dateFromNow', function (moment) {
        return function (text, endDate) {
            var end = endDate ? moment(endDate) : moment();
            return end.from(moment(text), true);
        }
    });


})();