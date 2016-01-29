app.controller('DefaultCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.roseteClass = 'rotatingbehind';
    $scope.fadeInAnimation = 'opacity_zero';

    $timeout(function() {
        $scope.fadeInAnimation = 'fadein';
    }, 500);

    $timeout(function() {
        $scope.roseteClass = 'rotating';
    }, 1000);
}]);
