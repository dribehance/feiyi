// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").controller("indexController", function($scope, $filter, $rootScope, $location, $timeout, weixinServices, feiyiServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$rootScope.wx_browser && weixinServices.config();
	// query province
	toastServices.show();
	feiyiServices.query_province_city_district().then(function(data) {
		toastServices.hide()
		$scope.provinces = data.province;
		$scope.input.province = $scope.provinces[0];
		$scope.input.city = $scope.provinces[0].city[0];
		$scope.input.district = $scope.provinces[0].city[0].district[0];
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
	$scope.choose_image = function() {
		weixinServices.choose_image({}, function(localIds) {
			$scope.input.preview_disease_image = localIds[0];
			$scope.upload_image(localIds[0]);
		})
	}
	$scope.upload_image = function(localId) {
		weixinServices.upload_image({
			localId: localId
		}, function(serverId) {
			userServices.upload({
				"mediaId": serverId
			}).then(function(data) {
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					$scope.input.disease_images = data.filename;
				} else {
					errorServices.autoHide(data.message);
				}
			})
		})
	};
	// $scope.input.disease_images = "default.png";
	$scope.remove = function() {
		$scope.input.disease_images = "";
	}
	localStorageService.remove("search_cache");
	$scope.ajaxForm = function() {
		// if (!$scope.input.disease_images) {
		// 	errorServices.autoHide("请上传图片");
		// 	return;
		// }
		localStorageService.set("search_cache", $scope.input);
		toastServices.show();
		userServices.booking({
			"province": $scope.input.province.name,
			"city": $scope.input.city.name,
			"area": $scope.input.district.name,
			"hospital_name": $scope.input.hospital,
			"department": $scope.input.department,
			"order_name": $scope.input.username,
			"order_telephone": $scope.input.telephone,
			"disease_name": $scope.input.disease_name,
			"disease_content": $scope.input.disease_content,
			"disease_images": $scope.input.disease_images,
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