app.factory('$scroll', function(){
    function Scroll(){
        this.listeners = [];
    }

    Scroll.prototype.scrolling = function() {
        var _this = this;

        _this.onScroll();
    };

    Scroll.prototype.register = function(func) {
        var _this = this;

        _this.listeners.push(func);
    };

    Scroll.prototype.onScroll = function() {
        var _this = this;
        for (var i = 0; i < _this.listeners.length; i++) {
            _this.listeners[i]();
        }
    };

    var scroll = new Scroll();
    
    return scroll;
});
