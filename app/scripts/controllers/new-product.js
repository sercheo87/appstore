"use strict";
angular.module('appstoreApp')
.controller('NewProductCtrl', function ($scope, productService) {
	$scope.services = [{ServiceID: '1', ServiceName: 'Service1'},{ServiceID: '2', ServiceName: 'Service2'},{ServiceID: '3', ServiceName: 'Service3'}];

	productService.get(function (data) {
		$scope.productsCollection = data;
	});

	//todos functions
	$scope.add = function () {
		$scope.products.push({name: $scope.inputText, completed: false});
		$scope.inputText = "";
	};
	
	$scope.removeAll=function(){
		$scope.productsCollection=[];
		productService.put($scope.productsCollection);
	};

	// function to submit the form after all validation has occurred			
	$scope.submitForm = function() {
		// check to make sure the form is completely valid
		if ($scope.frmProduct.$valid) {
			$scope.productsCollection.push($scope.product);
			productService.put($scope.productsCollection);
		}
		console.log($scope.productsCollection);
	};
});