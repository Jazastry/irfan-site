module.exports = (function() {
    function Events() {
        this.events = [];
        this.facebookRequester = require('./facebook_requester_es6.js');
        this.loadEvents();
    }

    Events.prototype.loadEvents = function(callback) {
        var _this = this;

        _this.facebookRequester.getEvents()
            .then(function(events) {
                _this.events = events;
            });
        _this.listenForDataChanges();
    };

    Events.prototype.listenForDataChanges = function() {
        var _this = this;
        var fs = require('fs');

        fs.watch('../data/events.json', function(a) {
            if (a === 'change') {
                _this.facebookRequester.getEvents()
                    .then(function(events) {
                        _this.events = events;
                    });
            }
        });
    };

    return new Events();
}());
