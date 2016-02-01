app.controller('EventsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    // $http({
    //   method: 'GET',
    //   url: '/events'
    // }).then(function successCallback(response) {
    // console.log('response ' , response.data);
    //    // angular.element(response.data).find();
    //   }, function errorCallback(response) {
    //   console.log('response ' , response);
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //   });
    $scope.events = [{
        time: '2015-11-22 Sun 8:30 PM in UTC+01',
        name: 'Irfan + Cesair',
        href: 'https://www.facebook.com/events/1386227291707151/',
        place: {
            city: 'Groningen',
            country: 'Netherlands',
            venue: {
                name: 'Sempron',
                href: 'https://www.facebook.com/SimplonNL/'
            }
        }
    }];

    $scope.date = function(string){
    	return new Date(string);
    };
}]);
