// facebook preparation
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1678584785723081',
    xfbml      : true,
    version    : 'v2.5'
  });

  FB.ui({
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
      object:'https://developers.facebook.com/docs/',
    })
  }, function(response){
    // Debug response (optional)
    console.log(response);
  });

  FB.getLoginStatus(function(response) {
  console.log('response ' , response);
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token 
      // and signed request each expire
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
    } else {
      // the user isn't logged in to Facebook.
    }
   });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

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

