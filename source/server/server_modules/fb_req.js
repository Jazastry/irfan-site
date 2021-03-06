'use strict';
'esversion: 6';
module.exports = (function() {
    const fs = require('fs');
    const request = require('request');

    class FacebookRequester {
        constructor() {
            this.ACCESS_TOKEN = null;
            this.getAccessToken();
        }

        getAccessToken() {
            var _this = this;

            var APP_SECRET = '8c90e9698c5e102cdbca03416749b4fa';
            var APP_ID = '1678584785723081';
            var tokenUrl = 'https://graph.facebook.com/oauth/access_token?client_id=' +
                APP_ID + '&client_secret=' + APP_SECRET + '&grant_type=client_credentials';
            return new Promise(function(resolve, reject) {
                request(tokenUrl, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        _this.ACCESS_TOKEN = body;
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }

        requestEvent(eventId) {
            let _this = this;
            let eventUrl = 'https://graph.facebook.com/v2.5/' + eventId + '?' + _this.ACCESS_TOKEN + '&debug=all&format=json&method=get'; //&pretty=0&suppress_http_code=1';

            return new Promise(function(resolove, reject) {
                request(eventUrl, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolove(body);
                    } else {
                        reject(error);
                    }
                });
            });
        }

        loadEventsArray() {
            var _this = this;
            return new Promise(function(resolve, reject) {
                function allEventsArray(eventIds) {
                    var eventRequestsArr = [];
                    for (var i = 0; i < eventIds.length; i++) {
                        eventRequestsArr.push(_this.requestEvent(eventIds[i]));
                    }
                    return eventRequestsArr;
                }

                fs.readFile('./data/fbEventIds.json', 'utf8', function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    var eventIds = JSON.parse(data);
                    Promise.all(allEventsArray(eventIds)).then(function(events) {
                        events = _this.parseEvents(events);
                        events = events.sort(function(a, b) {
                            return new Date(b.start_time) - new Date(a.start_time);
                        });

                        resolve(events);
                    });
                });
            });
        }

        reloadEvents() {
            var _this = this;
            return new Promise(function(resolve, reject) {
                function allEventsArray(eventIds) {
                    var eventRequestsArr = [];
                    for (var i = 0; i < eventIds.length; i++) {
                        eventRequestsArr.push(_this.requestEvent(eventIds[i]));
                    }
                    return eventRequestsArr;
                }

                fs.readFile('./data/fbEventIds.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    var eventIds = JSON.parse(data);
                    Promise.all(allEventsArray(eventIds)).then(function(events) {
                        events = _this.parseEvents(events);
                        _this.fetchEvents(events, function(ev) {
                            _this.writeEvents(events, function() {
                                resolve();
                            });
                        });
                    });
                });
            });
        }

        writeEvents(events, callback) {
            fs.writeFile('./data/events.json', JSON.stringify(events), 'utf8', (err) => {
                if (err) {
                    reject(err);
                }
                console.log('IN WRITE EV');
                callback();
            });
        }

        fetchEvents(events, callback) {
            var _this = this;
            fs.readFile('./data/events.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                var currentEvents = JSON.parse(data);
                if (currentEvents.length > 0) {
                    for (var i = 0; i < events.length; i++) {
                        var present = currentEvents.filter(function(ev) {
                            return ev.facebook && ev.id == events[i].id;
                        });

                        if (present.length < 1) {
                            events[i].facebook = true;
                            currentEvents.push(events[i]);
                        }
                    }

                    for (var j = 0; j < currentEvents.length; j++) {
                        var present = events.filter(function(ev) {
                            return ev.id === currentEvents[j].id;
                        });
                        if (currentEvents[j].facebook && present.length < 1) {
                            currentEvents.splice(j, 1);
                        }
                    }
                    callback(_this.sortEvents(currentEvents));
                } else {
                    callback(_this.sortEvents(events));
                }
            });
        }

        sortEvents(ev) {
            return ev.sort(function(a, b) {
                return new Date(b.start_time) - new Date(a.start_time);
            });
        }

        parseEvents(data) {
            var res = [];
            // parse json data
            for (var i = 0; i < data.length; i++) {
                res.push(JSON.parse(data[i]));
            }
            return res;
        }

        getEvents() {
            var _this = this;
            return new Promise(function(resolve, reject) {
                if (!_this.ACCESS_TOKEN) {
                    _this.getAccessToken()
                        .then(function() {
                            console.log('IN NO TOKEN ');
                            resolve(_this.loadEventsArray());
                        });
                } else {
                    console.log('IN HAS TOKEN');
                    resolve(_this.loadEventsArray());
                }
            });
        }
    }

    return new FacebookRequester();
}());
