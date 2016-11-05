angular.module("Feiyi").controller("doctorsController", function($scope, $filter, $location, $routeParams, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	if (localStorageService.get("search_cache")) {
		$scope.input = angular.extend({}, localStorageService.get("search_cache"));
	}
	toastServices.show();
	userServices.query_doctors({
		"province": $scope.input.province,
		"city": $scope.input.city,
		"hospital_name": $scope.input.hospital,
		"department": $scope.input.department,
		"order_name": $scope.input.username,
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.doctors = data.Result.DoctorList;
		} else {
			errorServices.autoHide(data.message);
		}
		if ($scope.doctors.length > 0) {
			$scope.input.type = 1;
		} else {
			$scope.input.type = 3;
		}
	});
	$scope.check_doctor = function(doctor_id, event) {
		event.stopPropagation();
		event.preventDefault();
		$scope.input.check_doctor_id = doctor_id;
		if ($scope.input.check_doctor_id == 0) {
			$scope.input.type = 2
		}
	}
	$scope.go = function(doctor_id) {
		$location.path("doctor").search("doctor_id", doctor_id);
	}
	$scope.booking = function() {
		toastServices.show();
		userServices.booking_by_doctory_id({
			"doctor_id": $scope.input.check_doctor_id || "0",
			"province": $scope.input.province,
			"city": $scope.input.city,
			"hospital_name": $scope.input.hospital,
			"department": $scope.input.department,
			"order_name": $scope.input.username,
			"order_telephone": $scope.input.telephone,
			"disease_name": $scope.input.disease_name,
			"disease_content": $scope.input.disease_content,
			"disease_images": $scope.input.disease_images || "not found",
			"type": $scope.input.type,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				weixinServices.prepare_pay({
					order_id: data.orders_id
				})
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})