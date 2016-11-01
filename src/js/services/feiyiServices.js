// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").factory("feiyiServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		query_information_by_type: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/NewsManage/newsList",
		})),
		query_information_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/NewsManage/newsDetail",
		})),
	}
});