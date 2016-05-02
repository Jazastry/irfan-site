app.controller('MediaCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/audio',
        params: { album: 'a', song: '1' }
    }).then(function successCallback(data, status, header) {
            console.log('SUCCESS:');
            console.log('data, status, header ', data, status);
        },
        function errorCallback(data, status, header) {
            console.log('ERROR:');
            console.log('data, status, header ', data, status);
        });
    var win = new Audio('/audio?album=a&song=1');

    win.play();

    // $http({
    //     method: 'GET',
    //     url: '/events'
    // }).then(function successCallback(response) {
    //     var events = response.data;
    //     console.log('events ' , events);
    //     // separateByYear(events);
    // }, function errorCallback(response) {

    // });
}]);
