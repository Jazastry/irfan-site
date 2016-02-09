var express = require('express');
var request = require('request');
var app = express();

// serve public files
app.use(express.static('../public'));

var ACCESS_TOKEN = '';

function requestAccessToken(callback) {
    var APP_SECRET = '';
    var APP_ID = '';
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
    // eventsUrl = 'https://graph.facebook.com/v2.5/Irfantheband/?' + ACCESS_TOKEN + '&debug=all&format=json&method=get'; //&pretty=0&suppress_http_code=1';
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

function eventsArray() {
    fs = require('fs');
    var eventIds = [];
    var events = [];

    function getEvents(eventIds) {
    	for (var i = 0; i < eventIds.length; i++) {
    		requestEvent(eventIds[i], function(data){
    			events.push(data);;
    		});
    	}
    }

    fs.readFile(__dirname + '/data/events.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        eventIds = JSON.parse(data);
    });
}

requestAccessToken();

app.get('/events', function(req, res) {
    if (!ACCESS_TOKEN) {
        requestAccessToken(function() {
            requestEvents(function(data) {
                res.send(data);
            });
        });
    } else {
        requestEvents(function(data) {
            res.send(data);
        });
    }
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
