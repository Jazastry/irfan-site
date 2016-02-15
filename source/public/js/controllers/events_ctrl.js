app.controller('EventsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http({
        method: 'GET',
        url: '/events'
    }).then(function successCallback(response) {
    console.log('response ' , response);
        var events = response.data;
        console.log('events ' , events);
        separateByYear(events);

    }, function errorCallback(response) {
        console.log('response ', response);
    });


    function separateByYear(events) {

        var lastYear = 0;
        var byYear = [];
        var currentEventsArr = [];

        var eventIds = [];

        for (var i = 0; i < events.length; i++) {
            var year = new Date(events[i].start_time).getFullYear();
            eventIds.push(events[i].id);

            if(lastYear !== year && i > 0) {
                byYear.push(currentEventsArr);
                currentEventsArr = [];
                currentEventsArr.push(events[i]);
            } else {
                currentEventsArr.push(events[i]);
            }

            lastYear = year;
        }

        console.log(eventIds);

        $scope.eventsByYear = byYear;
    }
}]);
