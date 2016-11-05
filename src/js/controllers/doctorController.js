angular.module("Feiyi").controller("doctorController", function($scope, $routeParams, $filter, $location, $rootScope, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.tab_item = "doctor_info";
	$scope.active_tab = function(tab) {
		$scope.tab_item = tab;
	}
	toastServices.show();
	userServices.query_doctor_by_id({
		doctor_id: $routeParams.doctor_id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.doctor = data.Result.DoctorInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.comments = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		doctor_id: $routeParams.doctor_id
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_comment_by_doctor($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.comments = $scope.comments.concat(data.Result.CommentList.list);
				$scope.total_comment_amount = data.Result.CommentList.totalRow;
				$scope.no_more = $scope.comments.length == data.Result.CommentList.totalRow ? true : false;
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