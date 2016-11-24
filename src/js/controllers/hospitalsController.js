// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").controller("hospitalsController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.hospital_keyword = $routeParams.hospital_keyword;
	if (!$scope.hospital_keyword) {
		$rootScope.back();
		return;
	}
	$scope.hospitals = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		kw: $scope.hospital_keyword
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_hospitals($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.hospitals = $scope.hospitals.concat(data.Result.HospitalList.list);
				$scope.no_more = $scope.hospitals.length == data.Result.HospitalList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
})