module.exports = (function() {
    function Events() {
        this.facebookRequester = require('./fb_req.js');
        this.loadEvents();
        this.listenForDataChanges();
    }

    Events.prototype.loadEvents = function(callback) {
        var _this = this;
        var fs = require('fs');

        fs.readFile('./data/fbEventIds.json', 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            _this.events = JSON.parse(data).sort(function(a, b) {                            
                    return new Date(b.start_time) - new Date(a.start_time);
                });
            callback(_this.events)        
        });
    };

    Events.prototype.listenForDataChanges = function() {
        var _this = this;
        var fs = require('fs');
        var eventsPath = './data/events.json'; // /fbEventIds.json'; //'../server/data/events.json'; // '../data/events.json'
        var fbEventIdsPath = './data/fbEventIds.json';

        fs.watch(fbEventIdsPath, function(changesInfo) {
            if (changesInfo === 'change') {
                _this.facebookRequester.reloadEvents()
                    .then(function() {
                        _this.loadEvents();
                    });
            }
        });
    };

    Events.prototype.getEvents = function(callback) {
        var _this = this;
        if (_this.events.length === 0) {
            _this.loadEvents(callback);
        } else {
            callback(_this.events);
        }
    };

    return new Events();
}());
