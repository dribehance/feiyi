// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").controller("informationController", function($scope, $location, feiyiServices, errorServices, toastServices, localStorageService, config) {
	$scope.tab_item = "1";
	$scope.active_tab = function(type) {
		if ($scope.tab_item == type) {
			return;
		}
		$scope.tab_item = type;
		$scope.page = {
			pn: 1,
			page_size: 10,
			message: "点击加载更多",
			type: type
		}
		$scope.no_more = false;
		$scope.information = [];
		$scope.loadMore();
	}
	$scope.go = function(id) {
		$location.path("information_detail").search("id", id)
	}
	$scope.information = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		type: 1
	}
	$scope.loadMore = function(type) {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		feiyiServices.query_information_by_type($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.information = $scope.information.concat(data.Result.NewsList.list);
				$scope.no_more = $scope.information.length == data.Result.NewsList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore(false);
});