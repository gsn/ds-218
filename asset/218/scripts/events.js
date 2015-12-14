(function (angular, undefined) {
  'use strict';
  var myModule = angular.module('gsn.core');

  myModule.directive("gsnRoundyEvents", ['$timeout', 'gsnStore', 'gsnApi', function ($timeout, gsnStore, gsnApi) {

    var directive = {
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs) {
		$timeout(function() {
			if(attrs.href != '/events')
				return;
			
			changeUrl(attrs);			
						
			scope.$on('gsnevent:store-setid', function (evt, store) {
				changeUrl(attrs);
			});
		}, 5);		
    }

	function changeUrl(attrs) {
		gsnStore.getStore().then(function (store) {
			if(!store) {
				attrs.$set('href', '/storelocator');
				attrs.$set('target', '');
			}
			else {
				updateUrl(attrs, store);
			}
		});
	}
	
	function updateUrl(attrs, store) {
		var redirectTo, target;
		if(store.Redirect.indexOf("http") > -1) {
			redirectTo = store.Redirect;
			target = '_blank';
		} else {
			redirectTo = gsnApi.decodeServerUrl(store.Redirect);
			target = '';
		}		
		
		attrs.$set('href', redirectTo);
		attrs.$set('target', target);
	}
  }]);
})(angular);