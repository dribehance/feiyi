// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").controller("indexController", function($scope, $filter, $location, $timeout, feiyiServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	// query province
	toastServices.show();
	feiyiServices.query_province().then(function(data) {
		toastServices.hide()
		$scope.provinces = data.province;
		$scope.input.province = $scope.provinces[0];
	});
	// query city when province change
	$scope.$watch("input.province", function(n, o) {
		if (!n) return;
		if (!$scope.all_cities) {
			feiyiServices.query_city().then(function(data) {
				$scope.all_cityies = data;
				$scope.cities = $scope.all_cityies[$scope.input.province];
				$scope.input.city = $scope.cities[0]
			});
		} else {
			$scope.cities = $scope.all_cityies[$scope.input.province];
			$scope.input.city = $scope.cities[0]
		}
	});
	// 验证码
	$scope.countdown = {
		// count: "5",
		message: "获取验证码",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode({
			order_telephone: $scope.input.telephone,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message)
			} else {
				$scope.countdown.reset = true;
				// $scope.modal.status = 3;
				errorServices.autoHide(data.message);
			}
		})
	};
	$scope.ajaxForm = function() {
		localStorageService.set("search_cache", $scope.input);
		toastServices.show();
		userServices.booking({
			"province": $scope.input.province,
			"city": $scope.input.city,
			"hospital_name": $scope.input.hospital,
			"department": $scope.input.department,
			"order_name": $scope.input.username,
			"order_telephone": $scope.input.telephone,
			"disease_name": $scope.input.disease_name,
			"disease_content": $scope.input.disease_content,
			"disease_images": "1.png",
			"msg_code": $scope.input.smscode,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$location.path("doctors");
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})