(function () {
    'use strict';

    angular
        .module('app.popup')
        .controller('PopUpLessonCtrl', Controller);

    function Controller(lesson, student, $mdDialog, instructors, cars, $filter, $state, moment) {
        var vm = this;
        vm.originalLesson = angular.copy(lesson);
        vm.lesson = lesson;
        vm.student = student;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.handleBilling = handleBilling;
        vm.addHour = addHour;

        activate();

        function activate() {
            if (vm.lesson){
                vm.lesson.start_date = new Date(angular.copy(vm.lesson.start_date));
                vm.lesson.end_date = new Date(angular.copy(vm.lesson.end_date));
                if (vm.lesson.driving_lesson_billing && vm.lesson.driving_lesson_billing.payment_date){
                    vm.lesson.driving_lesson_billing.payment_date = new Date(angular.copy(vm.lesson.driving_lesson_billing.payment_date));
                }
                vm.saveLabel = $state.current.name === 'app.lesson' ? $filter('translate')('save') : $filter('translate')('ok');
            } else {
                vm.lesson = {
                    driving_instructor_id: null,
                    driving_car_id: null,
                    driving_lesson_billing_id: null,
                    comment: null,
                    dates: [{
                        start_date: moment().add(1, 'd').subtract(1, 'h').startOf('hour').toDate(),
                        end_date: moment().add(1, 'd').startOf('hour').toDate()
                    }]
                };
                vm.saveLabel = $state.current.name === 'app.edit-student' || $state.current.name === 'app.create-student' ? $filter('translate')('ok') : $filter('translate')('save');
            }

            instructors.getSimpleInstructors().then(function (response) {
                vm.instructors = response.data;
            });
            cars.getSimpleCars().then(function (response) {
                vm.cars = response.data;
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function hide() {
            if (vm.lesson.driving_instructor_id){
                vm.lesson.driving_instructor = $filter('filterByIdInData')(vm.instructors, vm.lesson.driving_instructor_id, 'id_driving_instructor')[0];
            }
            $mdDialog.hide(vm.lesson);
        }

        function addHour() {
            vm.lesson.dates.push({
                start_date: null,
                end_date: null
            });
        }

        function handleBilling() {
            if (vm.lesson.driving_lesson_billing){
                vm.lesson.driving_lesson_billing = null;
            } else {
                vm.lesson.driving_lesson_billing = {
                    payment_date: new Date()
                };
            }
        }
    }
})();