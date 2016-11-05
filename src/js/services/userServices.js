// by dribehance <dribehance.kksdapp.com>
angular.module("Feiyi").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		rsa_key: apiServices._get(angular.extend({}, config.common_params, {
			url: "key/private_key.pem",
		})),
		// signin
		signin: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// signup
		signup: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/RegistTelOne",
			token: localStorageService.get("token")
		})),
		update_telephone: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/updateTelephone",
			token: localStorageService.get("token")
		})),
		// forget password
		forget: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// reset password
		reset: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		get_smscode: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/getCode",
			token: localStorageService.get("token")
		})),
		query_city: apiServices._get(angular.extend({}, config.common_params, {
			url: "city/city_with_index.json",
			token: localStorageService.get("token")
		})),
		query_inter_city: apiServices._get(angular.extend({}, config.common_params, {
			url: "city/inter_city_with_index.json",
			token: localStorageService.get("token")
		})),
		// 首页预约
		booking: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/makeOrder",
			token: localStorageService.get("token")
		})),
		// 列表预约
		booking_by_doctory_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/submitOrder",
			token: localStorageService.get("token")
		})),
		// 医生列表
		query_doctors: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/recommendDoctorList",
			token: localStorageService.get("token")
		})),
		// 医生信息
		query_doctor_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/doctorInfo",
			token: localStorageService.get("token")
		})),
		// 医生评论
		query_comment_by_doctor: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/commentList",
			token: localStorageService.get("token")
		})),
		// 订单列表
		query_orders: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/myOrderList",
			token: localStorageService.get("token")
		})),
		// 订单评论
		comment: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/comment",
			token: localStorageService.get("token")
		})),
		// 赠送锦旗
		donate: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/giveJinqi",
			token: localStorageService.get("token")
		})),
	}
});