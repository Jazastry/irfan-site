var app = angular.module('app', ['ngRoute'])
.config(['$routeProvider',
        function($routeProvider) {

            $routeProvider.when('/default', {
                templateUrl: 'js/templates/default.html',
                controller: 'DefaultCtrl'
            });            

        	$routeProvider.when('/home', {
        	    templateUrl: 'js/templates/home.html',
        	    controller: 'HomeCtrl'
        	});

            $routeProvider.when('/events', {
                templateUrl: 'js/templates/events.html',
                controller: 'EventsCtrl'
            });

            $routeProvider.when('/music', {
                templateUrl: 'js/templates/music.html',
                // controller: 'EventsCtrl'
            });

            $routeProvider.otherwise({
                redirectTo: '/default'
            });
        }
    ]);

