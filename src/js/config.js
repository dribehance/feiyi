angular.module("Feiyi").constant("config", {
	url: "http://www.orsynsystem.com",
	imageUrl: "http://www.orsynsystem.com/files/image?name=",
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
		"hospitals",
	"hospital_search"
	]
});