angular.module("Feiyi").controller("signinController", function($scope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	// if (localStorageService.get("token")) {
	// 	$location.path("information").replace();
	// }
	$scope.input = {};
	// 验证码
	$scope.countdown = {
		// count: "5",
		message: "获取验证码",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode({
			telephone: $scope.input.telephone,
			country_code: $scope.input.country_code.code
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
	}
	$scope.ajaxForm = function() {
		if (!$scope.agree) {
			errorServices.autoHide("请阅读并同意《译员协议》");
			return;
		}
		toastServices.show();
		userServices.signup({
			country_code: $scope.input.country_code.code,
			telephone: $scope.input.telephone,
			tel_code: $scope.input.code,
			weChat: $scope.input.wechat,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				localStorageService.set("token", data.token)
				$timeout(function() {
					$location.path("information").replace();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.input.country_code = {
		name: "中国",
		code: "+86"
	}

	$scope.agree = false;
	$scope.is_agree = function() {
		$scope.agree = !$scope.agree;
	};
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", $scope.input);
		$location.path(path).search("cache_key", key);
	}
	var cache = localStorageService.get("cache");
	if (cache) {
		$scope.input = angular.extend({}, $scope.input, cache);
	}
	var server = localStorageService.get("server");
	$scope.input.wechat = (server && server.wechat) || "";
})