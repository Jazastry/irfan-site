app.controller('navbar_ctrl', ['$scope', '$location', function($scope, $location) {

    // window.onscroll = function() {
    //     var headerHoneHeight = document.querySelector("header > .logo_container").offsetHeight;
    //     var navbar = document.getElementById("nav");        
    //     var scrollHeight = (document.documentElement && document.documentElement.scrollTop) || 
    //                   document.body.scrollTop;

    //     var hasFixedClass = navbar.className.indexOf('fixed');
    //     if (scrollHeight >= headerHoneHeight) {
    //     	if (hasFixedClass < 0) {
    //             navbar.className += " fixed";
    //     	}            
    //     } else if (scrollHeight < headerHoneHeight) {
    //     	if (hasFixedClass > 0) {
    //             navbar.className = navbar.className.replace(' fixed', '');
    //     	}            
    //     }
    // };

    $scope.goTo = function(location){
        if ($location.path() !== location) {
            window.scrollTo(0, 0);
            $location.path(location);
        }
    };
}]);
