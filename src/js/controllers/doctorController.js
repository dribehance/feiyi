angular.module("Feiyi").controller("doctorController", function($scope, $routeParams, $filter, $location, $rootScope, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.tab_item = "doctor_info";
	$scope.active_tab = function(tab) {
		$scope.tab_item = tab;
	}
})