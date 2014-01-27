"use strict";
angular.module('appstoreApp')
.controller('NewProductCtrl', function ($log, $scope, $modal, productService, growlNotifications, Note) {

	$scope.growlNotifications = growlNotifications;
	$scope.productsCollection = productService.get();
	$scope.services = [
		{ServiceID: '1', ServiceName: 'Service1'},
		{ServiceID: '2', ServiceName: 'Service2'},
		{ServiceID: '3', ServiceName: 'Service3'}
	];

	$scope.deleted=true;

	$scope.edit=function(product){
		$scope.items = ['item1', 'item2', 'item3'];

		var modalInstance = $modal.open({
			templateUrl: '/views/products/edit-product.html',
			controller: ModalInstanceCtrl,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});

	};

	$scope.remove=function(product){
		productService.remove(product);
		growlNotifications.add('Remove Product OK','sucess');
		$scope.productsCollection = productService.get();
	};

	$scope.removeAll=function(){
		productService.clear();
		growlNotifications.add('Register Deleted all','success');
		$scope.productsCollection = productService.get();
	};

	// function to submit the form after all validation has occurred			
	$scope.submitForm = function() {
	// check to make sure the form is completely valid
		if ($scope.frmProduct.$valid) {
			productService.put($scope.product);

			$scope.product.description='';
			$scope.product.ServiceID=undefined;
			$scope.product.name='';
			growlNotifications.add('Add Product OK','success');
			$scope.productsCollection = productService.get();
		}
	};
});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
};