	'use strict';

	angular.module('appstoreApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngAnimate',
		'ngRoute',
		'ui',
		'ui.bootstrap',
		'ui.bootstrap.modal'
		])
	.config(function ($routeProvider) {
		$routeProvider
		.when('/home', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/store', {
			templateUrl: 'views/store.html',
			controller: 'StoreCtrl'
		})
		.when('/orders', {
			templateUrl: 'views/orders.html',
			controller: 'OrdersCtrl'
		})
		.when('/products', {
			templateUrl: 'views/products.html',
			controller: 'ProductsCtrl'
		})
		.when('/products/new-product', {
			templateUrl: 'views/new-product.html',
			controller: 'NewProductCtrl'
		})
		.when('/api/check/:username', {
			templateUrl: 'views/main.html',
			controller: ''
		})
		.otherwise({
			redirectTo: '/home'
		});
	})

	/* Selected li from navigator */
	.controller('navCtrl', ['$scope', '$location','$log', function ($scope, $location,$log) {
		$scope.navClass = function (page) {
			var currentRoute = $location.path().substring(1) || 'home';    
			var regexp = new RegExp('^' + page.replace('/', '\\/') + '$');

			// Evaluate route regexp with current item selected
			if(regexp.test(currentRoute)) {
				return 'active';
			} else {
				return '';
			}
		};        
	}])
	;