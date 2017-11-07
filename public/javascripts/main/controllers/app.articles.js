(function(){
	'use strict';
	angular.module('blog')
		.controller('articlesCtrl', ['$http', '$scope', function($http, $scope){
			alert('articles is ok');
		}]);
})();