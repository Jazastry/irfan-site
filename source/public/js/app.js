var app = angular.module('app', ['ngRoute'])
.config(['$routeProvider',
        function($routeProvider) {

            $routeProvider.when('/default', {
                templateUrl: 'js/templates/default.html',
                controller: 'DefaultCtrl'
            });            

        	$routeProvider.when('/news', {
        	    templateUrl: 'js/templates/news.html',
        	    controller: 'NewsCtrl'
        	});

            $routeProvider.when('/events', {
                templateUrl: 'js/templates/events.html',
                controller: 'EventsCtrl'
            });

            $routeProvider.when('/media', {
                templateUrl: 'js/templates/media.html',
                controller: 'MediaCtrl'
            });

            $routeProvider.when('/google4795b4eacf9ec9ad.html', {
                templateUrl: 'js/templates/google4795b4eacf9ec9ad.html'
            });

            $routeProvider.otherwise({
                redirectTo: '/default'
            });
        }
    ]);

app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

