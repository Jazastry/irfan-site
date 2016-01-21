var app = angular.module('app', ['ngRoute'])
.config(['$routeProvider',
        function($routeProvider) {
        
        	$routeProvider.when('/home', {
        	    templateUrl: 'js/templates/home.html',
        	    // controller: 'HomeCtrl'
        	});

            $routeProvider.when('/events', {
                templateUrl: 'js/templates/events.html',
                // controller: 'EventsCtrl'
            });

            $routeProvider.otherwise({
                redirectTo: '/home'
            });
        }
    ]);

