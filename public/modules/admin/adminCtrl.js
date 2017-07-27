/* admin controllers*/
var app = angular.module('admin', []);

app.controller('adminCtrl', ['$scope', '$rootScope', 'mainServices', function($scope, $rootScope, mainServices) {
  console.log("admin page");

  //Page-Level Demo Scripts - Tables - Use for reference
	$(document).ready(function() {
    $('#dataTables-proposition').DataTable({
       responsive: true
    });
	});

}]);