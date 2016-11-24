// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").controller("hospitalSearchController", function($scope, $location, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		$location.path("hospitals").search("hospital_keyword", $scope.input.hospital);
	}
})