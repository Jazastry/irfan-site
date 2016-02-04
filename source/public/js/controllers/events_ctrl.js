app.controller('EventsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http({
        method: 'GET',
        url: '/events'
    }).then(function successCallback(response) {
        var events = response.data.data;
        separateByYear(events);

    }, function errorCallback(response) {
        console.log('response ', response);
    });

    $scope.date = function(string) {
        return new Date(string);
    };

    function separateByYear(events) {
        var lastYear = 0;
        var byYear = [];
        var currentEventsArr = [];

        for (var i = 0; i < events.length; i++) {
            var year = new Date(events[i].start_time).getFullYear();

            if(lastYear !== year && i > 0) {
                byYear.push(currentEventsArr);
                currentEventsArr = [];
                currentEventsArr.push(events[i]);
            } else {
                currentEventsArr.push(events[i]);
            }

            lastYear = year;
        }

        $scope.eventsByYear = byYear;
    }
}]);
