var express = require('express');
var request = require('request');
var app = express();

// serve public files
app.use(express.static(['../public','../admin']));

var ACCESS_TOKEN = '';

function requestAccessToken(callback) {
    var APP_SECRET = '8c90e9698c5e102cdbca03416749b4fa';
    var APP_ID = '1678584785723081';
    var tokenUrl = 'https://graph.facebook.com/oauth/access_token?client_id=' +
        APP_ID + '&client_secret=' + APP_SECRET + '&grant_type=client_credentials';

    request(tokenUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            ACCESS_TOKEN = body;
            if (callback) {
                callback();
            }
        }
    });
}

function requestEvents(callback) {
    var currDate = new Date();
    eventsUrl = 'https://graph.facebook.com/v2.5/Irfantheband/events?' + ACCESS_TOKEN + '&debug=all&format=json&method=get'; //&pretty=0&suppress_http_code=1';

    request(eventsUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });
}

function requestEvent(eventId, callback) {
    eventsUrl = 'https://graph.facebook.com/v2.5/' + eventId + '?' + ACCESS_TOKEN + '&debug=all&format=json&method=get'; //&pretty=0&suppress_http_code=1';
    request(eventsUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });
}
var events = [];

function eventsArray() {
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
                events.push(JSON.parse(data));
                
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
}

requestAccessToken();

if (!ACCESS_TOKEN) {
    requestAccessToken(function() {
        eventsArray();
    });
} else {
    eventsArray();
}



app.get('/events', function(req, res) {
    res.send(events);
});

app.get('/event', function(req, res) {
    // if (!ACCESS_TOKEN) {
    //     requestAccessToken(function() {
    //         requestEvents(function(data) {
    //             res.send(data);
    //         });
    //     });
    // } else {
    //     requestEvent('710518845716949', function(data) {
    //         console.log('data ', data);

    //     });
    // }
});


app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
