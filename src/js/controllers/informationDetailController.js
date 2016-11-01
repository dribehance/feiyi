// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").controller("informationDetailController", function($scope, $sce, $routeParams, feiyiServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	feiyiServices.query_information_by_id({
		news_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.info = data.Result.NewsDetailResponse;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.parse_html = function(html) {
		return $sce.trustAsHtml(html);
	}
})