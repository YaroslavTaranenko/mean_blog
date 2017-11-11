(function(){
	'use strict';
	var app = angular.module('admin', []);

	app.controller('defaultCtrl', ['$http', '$scope', function($http, $scope){
		//alert('angular is ok.');
	}]);
})();;(function(){
	'use strict';
	angular.module('admin')
		.controller('articlesCtrl', ['$http', '$scope', function($http, $scope){
			alert('articlesCtrl is working.');
		}]);
})();;/*				my-side-menu
					menu-item(type="label" title="Main")
					menu-item(type="parent" title="Articles")
						menu-item(type="link" title="Add new")
						menu-item(type="link" title="List")
					menu-item(type="parent" title="Users")
						menu-item(type="link" title="Add user")
						menu-item(type="link" title="List")*/
(function(){
	'use strict';
	var menu = {

	};
	angular.module('admin').directive('dropdown', function(){
		return{
			restrict: 'A',
			link: function(scope, element, attrs){
				element.on('click', function(){
					element.toggleClass('opened');
					$compile(element)(scope);
				});
			}
		}
	});
	angular.module('admin').directive('mySideMenu', function(){
		return {
			restrict: 'E',
			controller: function($scope){
				$scope.items = [];
				this.addItem = function(item){
					$scope.items.push(item);
				};
			},
			link: function(scope, element, atributes){
				console.log('mySideMenu linked');
			}
		};
	});
	angular.module('admin').directive('menuLabel', function(){
		return {
			restrict: 'E',
			require: '^mySideMenu',
			link: function(scope, element, attrs, menuCtrl){
				menuCtrl.addItem({type: attrs.type, title: attrs.title});
			}
		};
	});
	angular.module('admin').directive('menuParent', function(){
		return {
			restrict: "E",
			require: '^mySideMenu',
			controller: function($scope){
				$scope.subitems = [];
				this.addSubitem = function(sub){
					$scope.subitems.push(sub);
				};
			},
			link: function(scope, element, attrs, sideMenuCtrl){
							
				sideMenuCtrl.addItem({
					title: attrs.title,
					subitems: scope.subitems
				});
				
				console.log('linked menuParent ' + attrs.title);
			}
		};
	});
	angular.module('admin').directive('menuSubitem', function(){
		return {
			restrict: 'E', 
			require: '^menuParent',
			link: function(scope, element, attrs, parentCtrl){
				parentCtrl.addSubitem({title: attrs.title});
				console.log('linked menuSubitem ' + attrs.title);
			}
		}
	});
	angular.module('admin').directive('myMenu', function(){
		return {
			restrict: "E",
			templateUrl: '/templates/my_menu.html',
			controller: function($scope){
				$scope.$on('ready-to-render', function(e, items){
					$scope.items = items;
				});
			}

		};
	});
})();