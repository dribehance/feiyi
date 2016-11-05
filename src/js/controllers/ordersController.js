angular.module("Feiyi").controller("ordersController", function($scope, $routeParams, $route, $timeout, $filter, $location, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.tab_item = "1";
	$scope.active_tab = function(tab) {
		if ($scope.tab_item == tab) {
			return;
		}
		$scope.tab_item = tab;
		// reload;
		$scope.page = {
			pn: 1,
			page_size: 10,
			message: "点击加载更多",
			order_type: $scope.tab_item
		}
		$scope.no_more = false;
		$scope.orders = [];
		$scope.loadMore();
	}
	$scope.orders = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		order_type: $scope.tab_item
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_orders($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.orders = $scope.orders.concat(data.Result.OrderList.list);
				$scope.no_more = $scope.orders.length == data.Result.OrderList.totalRow ? true : false;
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
	$scope.goto_pay = function(order_id) {
		weixinServices.prepare_pay({
			order_id: data.orders_id
		})
	}
})