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
			
			initUrl(attrs);			
						
			$scope.$on('gsnevent:store-persisted', function (evt, store) {
				changeUrl(attrs, store);
			});
		}, 5);		
    }

	function initUrl(attrs) {
		gsnStore.getStore().then(function (store) {
			changeUrl(attrs, store);
		});
	}
	
	function changeUrl(attrs, store) {
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