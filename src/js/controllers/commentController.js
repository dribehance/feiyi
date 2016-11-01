angular.module("Feiyi").controller("commentController", function($scope, $rootScope, $timeout, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.comment({
			orders_id: $routeParams.order_id,
			comment_star: $scope.input.star,
			note: $scope.input.note,
			service: $scope.input.service,
			profession: $scope.input.profession,
			tongue: $scope.input.tongue,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})