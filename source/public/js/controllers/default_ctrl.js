app.controller('DefaultCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.fadeInAnimation = 'opacity_zero';
    $scope.backAnimationClass = 'animate_all opacity_zero';

    $timeout(function() {
        $scope.backAnimationClass = 'animate_all back_img_opacity';
         $scope.fadeInAnimation = 'fadein';

    }, 0);

    $timeout(function() {
        // $scope.fadeInAnimation = 'fadein';
        // $scope.backAnimationClass = 'slow_animate_all back_img_opacity back_zoom_in_transformation';
    }, 1500);

    $timeout(function(){

    });

    $scope.open = function(url) {
        window.open(
            '#/' + url,
            '_blank'
        );
    };
}]);
