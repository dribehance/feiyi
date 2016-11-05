angular.module("Feiyi").constant("config", {
	url: "http://120.76.55.55",
	imageUrl: "http://120.76.55.55/files/image?name=",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {
		invoke: "h5",
		app_sign: "123456"
	},
	interceptor: [
		"index",
		"comment",
		"comments",
		"doctor",
		"doctors",
		"donate",
		"orders",
		"order",
		"information",
		"information_detail",
		"signin",
	]
});