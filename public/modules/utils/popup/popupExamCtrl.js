(function () {
    'use strict';

    angular
        .module('app.popup')
        .controller('PopUpExamCtrl', Controller);

    function Controller(exam, student, $mdDialog, instructors, cars, examPlaces, $filter, $state) {
        var vm = this;
        vm.exam = exam;
        vm.student = student;
        vm.cancel = cancel;
        vm.hide = hide;

        activate();

        function activate() {
            if (vm.exam){
                vm.exam.exam_date = new Date(angular.copy(vm.exam.exam_date));
                vm.saveLabel = $state.current.name === 'app.exam' ? $filter('translate')('save') : $filter('translate')('ok');
            } else {
                vm.exam = {
                    'status_exam_id': 1
                };
                vm.saveLabel = $state.current.name === 'app.edit-student' || $state.current.name === 'app.create-student' ? $filter('translate')('ok') : $filter('translate')('save');
            }
            instructors.getSimpleInstructors().then(function (response) {
                vm.instructors = response.data;
            });
            cars.getSimpleCars().then(function (response) {
                vm.cars = response.data;
            });
            examPlaces.getSimpleExamPlaces().then(function (response) {
                vm.examPlaces = response.data;
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function hide() {
            if (vm.exam.driving_instructor_id){
                vm.exam.driving_instructor = $filter('filterByIdInData')(vm.instructors, vm.exam.driving_instructor_id, 'id_driving_instructor')[0];
            }
            if (vm.exam.driving_exam_place_id){
                vm.exam.driving_exam_place = $filter('filterByIdInData')(vm.examPlaces, vm.exam.driving_exam_place_id, 'id_driving_exam_place')[0];
            }
            $mdDialog.hide(vm.exam);
        }
    }
})();