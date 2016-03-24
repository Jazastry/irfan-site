app.controller('EventsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http({
        method: 'GET',
        url: '/events'
    }).then(function successCallback(response) {
        var events = response.data;
        separateByYear(events);
    }, function errorCallback(response) {

    });

    function separateByYear(events) {
        var byYear = {};
        for (var i = 0; i < events.length; i++) {
            var year = new Date(events[i].start_time).getFullYear();
            if (byYear[year]) {
                byYear[year].push(events[i]);
            } else {
                byYear[year] = [];
                byYear[year].push(events[i]);
            }            
        }
        $scope.eventsByYear = byYear;//byYear;
    }
    
}]);
