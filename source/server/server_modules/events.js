module.exports = (function() {
    function Events() {
        this.events = [];
        this.subscribtions = [];
        this.facebookRequester = require('./fb_req.js');
        this.loadEvents();
        this.listenForDataChanges();
    }

    Events.prototype.subscribe = function(callback) {
        var _this = this;
        _this.subscribtions.push(callback);        
    };

    Events.prototype.broadcast = function() {
        var _this = this;
        // send data to subscribers
        for (var j = 0; j < _this.subscribtions.length; j++) {
            console.log('serve events');
            _this.subscribtions[j](_this.events);
        }
    };

    Events.prototype.loadEvents = function() {
        var _this = this;

        _this.facebookRequester.getEvents()
            .then(function(data) {     
                _this.events = data;
                _this.broadcast();
            });
    };

    Events.prototype.listenForDataChanges = function() {
        var _this = this;
        var fs = require('fs');
        var jsonPath = './data/events.json';//'../server/data/events.json'; // '../data/events.json'

        fs.watch(jsonPath, function(changesInfo) {
            if (changesInfo === 'change') {
                _this.facebookRequester.getEvents()
                    .then(function(data) {                        
                        _this.events = data;
                        _this.broadcast();
                    });
            }
        });
    };

    return new Events();
}());