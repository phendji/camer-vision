(function () {
    'use strict';

    angular
        .module('app.hpg-edit')
        .controller('HpgEditCtrl', HpgEditCtrl);

    function HpgEditCtrl(hpg, hpgService, $location, $anchorScroll, $filter, $scope) {
        var vm = this;
        var anchors = [
            'identity-hpg-edit',
            'career-hpg-edit',
            'formation-hpg-edit'
        ];

        $scope.scrollY = 0;

        vm.hpg = hpg;
        vm.setG70 = setG70;
        vm.upload = upload;
        vm.save = save;
        vm.scrollTo = scrollTo;
        vm.loadingPhoto = false;
        vm.loadingCv = false;

        activate();

        function activate() {
            for (var i = 0; i < anchors.length; i++) {
                if ($location.url().indexOf(anchors[i]) !== -1) {
                    vm.activeTab = anchors[i];
                    scrollTo(anchors[i]);
                    break;
                }
            }
            if (!vm.activeTab) vm.activeTab = anchors[0];

            vm.chartConfig = {
                chart: {
                    type: 'line'
                },
                series: [{
                    data: getChartData(),
                    name: $filter('translate')('np_trend'),
                    id: 'trendchart'
                }],
                title: {
                    text: null
                },
                yAxis: {
                    tickInterval: 1,
                    title: {
                        enabled: true,
                        text: $filter('translate')('NP'),
                        style: {
                            fontFamily: 'BoldFont'
                        }
                    }
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: $filter('translate')('years'),
                        style: {
                            fontFamily: 'BoldFont'
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            };
        }

        function save() {
            hpgService.save(vm.hpg).then(function (response) {
                vm.hpg = response;
                hideLoaders();
            }, function () {
                hideLoaders();
            });
        }

        function getChartData() {
            var data = [];
            var year;
            for (var i = 0; i < vm.hpg.assignments.length; i++) {
                if (vm.hpg.assignments[i].np) {
                    year = parseInt($filter('myDateFormat')(vm.hpg.assignments[i].start_date, 'yyyy'))
                    data.push({
                        x: year,
                        y: vm.hpg.assignments[i].np,
                        name: year
                    });
                }
            }
            return data;
        }

        function setG70() {
            vm.hpg.is_g70 = !vm.hpg.is_g70;
            save();
        }

        function upload(type) {
            if (type === 'cv') {
                vm.hpg.cv_link = vm.importedCV.base64;
                vm.loadingCv = true;
            } else {
                vm.hpg.photo_link = vm.importedPhoto.base64;
                vm.loadingPhoto = true;
            }
            save();
        }

        function scrollTo(el) {
            if (el === 'top-hpg-edit'){
                vm.activeTab = anchors[0];
            } else {
                vm.activeTab = el;
            }
            $location.hash(el);
            $anchorScroll();
        }

        function hideLoaders() {
            vm.loadingPhoto = false;
            vm.loadingCv = false;
        }
    }
})();