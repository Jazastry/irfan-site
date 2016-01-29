app.controller('navbar_ctrl', ['$scope', function($scope) {
    window.onscroll = function() {
        var headerHoneHeight = document.querySelector("header > .logo_container").offsetHeight;
        var navbar = document.getElementById("nav");        
        var scrollHeight = (document.documentElement && document.documentElement.scrollTop) || 
                      document.body.scrollTop;

                      console.log('scrollHeight ' , scrollHeight);

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
