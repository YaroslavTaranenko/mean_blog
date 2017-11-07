(function(){
	'use strict';
	var app = angular.module('blog', []);

	app.controller('defaultCtrl', ['$http', '$scope', function($http, $scope){
		this.showLoginForm = false;

		this.toggleLoginForm = function(){
			this.showLoginForm = ! this.showLoginForm;
		}
	}]);
})();