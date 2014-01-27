	'use strict';

	angular.module('appstoreApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngAnimate',
		'ngRoute',
		'growlNotifications',
		'ui',
		'ui.bootstrap',
		'ui.bootstrap.modal'
		])

	.run(['$animate', function($animate){
		$animate.enabled(true);
		console.log('Animation enabled: ' + $animate.enabled());
	}])

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
			templateUrl: 'views/products/products.html',
			controller: 'ProductsCtrl'
		})
		.when('/products/new-product', {
			templateUrl: 'views/products/new-product.html',
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

	.config(['growlNotificationsProvider', function(growlNotificationsProvider){
		growlNotificationsProvider.ttl(2000);
		growlNotificationsProvider.type('warning');
	}])

	/* Selected li from navigator */
	.controller('navCtrl', function ($scope, $location,$log) {
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
	})
;

angular.module('appstoreApp').animation('.my-crazy-animation', function() {
    return {
      enter: function(element, done) {
        //run the animation here and call done when the animation is complete
        return function(cancelled) {
          //this (optional) function will be called when the animation
          //completes or when the animation is cancelled (the cancelled
          //flag will be set to true if cancelled).
        };
      },
      leave: function(element, done) { },
      move: function(element, done) { },
 
      //animation that can be triggered before the class is added
      beforeAddClass: function(element, className, done) { },
 
      //animation that can be triggered after the class is added
      addClass: function(element, className, done) { },
 
      //animation that can be triggered before the class is removed
      beforeRemoveClass: function(element, className, done) { },
 
      //animation that can be triggered after the class is removed
      removeClass: function(element, className, done) { }
    };
  });