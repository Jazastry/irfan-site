app.controller('EventsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    // $http({
    //     method: 'GET',
    //     url: '/events'
    // }).then(function successCallback(response) {
    // console.log('response EVENTS ' , response);
    //     $scope.events = JSON.parse(response.data.body);
    //     console.log('JSON.parse(response.data.body) ', JSON.parse(response.data.body));
    // }, function errorCallback(response) {
    //     console.log('response ', response);
    // });

    $scope.date = function(string) {
        return new Date(string);
    };
}]);
