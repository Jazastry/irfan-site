app.controller('navbar_ctrl', ['$scope', function($scope) {
    var body = document.querySelector("body");
    body.onscroll = function() {
        var headerHoneHeight = document.querySelector("header > h1").offsetHeight;
        var navbar = document.getElementById("nav");
        var scrollHeight = body.scrollTop;
        var hasFixedClass = navbar.className.indexOf('fixed');
        if (scrollHeight >= headerHoneHeight) {
        	if (hasFixedClass < 0) {
        		navbar.className += " fixed";
        	}            
        } else if (scrollHeight < headerHoneHeight) {
        	if (hasFixedClass > 0) {
        		navbar.className = navbar.className.replace(' fixed', '');
        	}            
        }
    };

}]);
