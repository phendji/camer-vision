(function () {
    angular.module("app.popup")
        .factory("popup", function ($mdDialog, $filter, RemoteApi, $http, lessons, exams, students) {
            var o = {
                confirmDelete: function (ev, object, title, description) {
                    var confirm = $mdDialog.confirm()
                        .title($filter('translate')(title) + object + '?')
                        .textContent($filter('translate')(description))
                        .targetEvent(ev)
                        .ok($filter('translate')('delete'))
                        .cancel($filter('translate')('cancel'));
                    return $mdDialog.show(confirm);
                },
                confirmSend: function (ev, object, title, description) {
                    var confirm = $mdDialog.confirm()
                        .title($filter('translate')(title) + object + '?')
                        .textContent($filter('translate')(description))
                        .targetEvent(ev)
                        .ok($filter('translate')('send'))
                        .cancel($filter('translate')('cancel'));
                    return $mdDialog.show(confirm);
                },
                handleLesson: function (ev, student, lesson_id, lesson) {
                    if (lesson_id) {
                        return lessons.get(lesson_id).then(function (response) {
                                return $mdDialog.show({
                                    controller: 'PopUpLessonCtrl as ps',
                                    templateUrl: 'modules/utils/popup/popupLesson.html',
                                    parent: angular.element(document.body),
                                    targetEvent: ev,
                                    clickOutsideToClose: true,
                                    fullscreen: true,
                                    locals: {
                                        lesson: response.data,
                                        student: student
                                    }
                                })
                            }
                        );
                    } else if (!lesson_id && lesson) {
                        return $mdDialog.show({
                            controller: 'PopUpLessonCtrl as ps',
                            templateUrl: 'modules/utils/popup/popupLesson.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: true,
                            locals: {
                                lesson: lesson,
                                student: student
                            }
                        })
                    } else {
                        return $mdDialog.show({
                            controller: 'PopUpLessonCtrl as ps',
                            templateUrl: 'modules/utils/popup/popupLesson.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: true,
                            locals: {
                                lesson: undefined,
                                student: student
                            }
                        });
                    }
                },
                handleExam: function (ev, student, exam_id, exam) {
                    if (exam_id) {
                        return exams.get(exam_id).then(function (response) {
                                return $mdDialog.show({
                                    controller: 'PopUpExamCtrl as pex',
                                    templateUrl: 'modules/utils/popup/popupExam.html',
                                    parent: angular.element(document.body),
                                    targetEvent: ev,
                                    clickOutsideToClose: true,
                                    fullscreen: true,
                                    locals: {
                                        exam: response.data,
                                        student: student
                                    }
                                })
                            }
                        );
                    } else if (!exam_id && exam) {
                        return $mdDialog.show({
                            controller: 'PopUpExamCtrl as pex',
                            templateUrl: 'modules/utils/popup/popupExam.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: true,
                            locals: {
                                exam: response.data,
                                student: student
                            }
                        })
                    } else {
                        return $mdDialog.show({
                            controller: 'PopUpExamCtrl as pex',
                            templateUrl: 'modules/utils/popup/popupExam.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: true,
                            locals: {
                                exam: undefined,
                                student: student
                            }
                        })
                    }
                },
                editComment: function (ev, student, id_student) {
                    return students.editComment(id_student).then(function (response) {
                            return $mdDialog.show({
                                controller: 'PopUpCommentCtrl as ps',
                                templateUrl: 'modules/utils/popup/popupComment.html',
                                parent: angular.element(document.body),
                                targetEvent: ev,
                                clickOutsideToClose: true,
                                fullscreen: true,
                                locals: {
                                    comment: response.data.comment,
                                    student: student
                                }
                            })
                        }
                    );
                }
            };
            return o;
        })
})();