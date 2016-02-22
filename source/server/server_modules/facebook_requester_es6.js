'use strict';
'esversion: 6';
module.exports = (function() {
    const fs = require('fs');
    const request = require('request');

    class FacebookRequester {
        constructor() {
            var _this = this;
            this.ACCESS_TOKEN = false;
            this.events = [];
            _this.loadEvents();
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
            let eventIds = [];
            return new Promise(function(resolve) {
                function allEventsArray() {
                    var eventRequestsArr = [];

                    for (var i = 0; i < eventIds.length; i++) {
                        eventRequestsArr.push(_this.requestEvent(eventIds[i]));
                    }

                    return eventRequestsArr;
                }

                fs.readFile('../data/events.json', 'utf8', function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    eventIds = JSON.parse(data);

                    Promise.all(allEventsArray()).then(function(events) {
                        events = events.sort(function(a, b) {
                            return new Date(b.start_time) - new Date(a.start_time);
                        });
                        _this.events = events;

                        resolve();
                    });
                });
            });
        }


        loadEvents() {
            var _this = this;
            return new Promise(function(resolve) {

                if (!_this.ACCESS_TOKEN) {
                    _this.getAccessToken()
                        .then(function() {
                            _this.loadEventsArray()
                                .then(function() {
                                resolve();
                            });
                        });
                } else {
                    _this.loadEventsArray()
                        .then(function() {
                            resolve();
                        });
                }
            });
        }

        getEvents() {
            var _this = this;
            return new Promise(function(resolve) {
                if (_this.events.length === 0) {
                    _this.loadEvents()
                        .then(function() {
                            resolve(_this.events);
                        });
                } else {
                    resolve(_this.events);
                }
            });
        }
    }


    return new FacebookRequester();
}());
