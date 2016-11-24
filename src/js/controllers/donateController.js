angular.module("Feiyi").controller("donateController", function($scope, $rootScope, $timeout, $routeParams, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.donate_money = $routeParams.donate_money;
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.donate({
			orders_id: $routeParams.order_id,
			content: $scope.input.note,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				weixinServices.prepare_pay({
					give_jinqi_id: data.give_jinqi_id
				});
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})