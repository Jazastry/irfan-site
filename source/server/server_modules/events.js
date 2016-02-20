module.exports = (function() {
    function Events() {
        this.events = [];
        this.facebookRequester = require('./facebook_requester.js');
    }

    Events.prototype.loadEvents = function(callback) {
        var _this = this;

        if (_this.facebookRequester.ACCESS_TOKEN) {
            _this.facebookRequester.requestAccessToken(function() {
                _this.eventsArray();
            });
        } else {
            _this.eventsArray();
        }

    };

    Events.prototype.eventsArray = function() {
        var _this = this;

        fs = require('fs');
        var eventIds = [];

        function getEventsRecurse(index) {
            var i = index;
            if (i < eventIds.length) {
                requestEvent(eventIds[i], function(data) {
                    events.push(data);
                    index += 1;
                    getEvents(index);
                });
            } else {
                return events;
            }
        }

        function getEvents() {
            for (var i = 0; i < eventIds.length; i++) {
                requestEvent(eventIds[i], function(data) {
                    _this.events.push(JSON.parse(data));

                    if (events.length === eventIds.length) {
                        events = events.sort(function(a, b) {
                            return new Date(b.start_time) - new Date(a.start_time);
                        });
                    }
                });
            }
        }
        fs.readFile(__dirname + '/data/events.json', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            eventIds = JSON.parse(data);
            getEvents();
        });

    };
}());
