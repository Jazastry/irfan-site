var express = require('express');
var request = require('request');
var app = express();

// serve public files
app.use(express.static('../public'));

var ACCESS_TOKEN = '';
function requestAccessToken(callback){
	var APP_SECRET = '5dee82d7217c4fbbf73e71987433760b';
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

function requestEvents(callback){
	eventsUrl = 'https://graph.facebook.com/v2.5/Irfantheband/events?' + ACCESS_TOKEN + '&debug=all&format=json&method=get&pretty=0&suppress_http_code=1';
	request(eventsUrl, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        callback(body);
	    }
	});
}

requestAccessToken();

app.get('/events', function(req, res) {
	if (! ACCESS_TOKEN) {
		requestAccessToken(function(){
			requestEvents(function(data){
				res.send(data);
			});
		});
	} else {
		requestEvents(function(data){
			res.send(data);
		});
	}
});


app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});

