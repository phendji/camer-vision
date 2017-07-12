(function () {
    'use strict';
    angular
        .module('app')
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.$apply(function () {
                            scope.fileread = changeEvent.target.files[0];
                        });
                    });
                }
            }
        }])
        .directive('capitalizeFirst', function($parse) {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, modelCtrl) {
                    var capitalize = function(inputValue) {
                        if (inputValue === undefined) { inputValue = ''; }
                        var capitalized = inputValue.charAt(0).toUpperCase() +
                            inputValue.substring(1);
                        if(capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    };
                    modelCtrl.$parsers.push(capitalize);
                    capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
                }
            };
        }).directive('capitalize', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    }).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return '';
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }).directive("scroll", function () {
        return {
            bindToController: true,
            link: function(scope, element, attrs) {
                $(element).bind("scroll", function(e) {
                    scope.scrollY = e.currentTarget.scrollTop;
                    scope.$apply();
                });
            }
        }
    });
})();