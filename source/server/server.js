var express = require('express');
var request = require('request');
var app = express();
app.use(express.static('../public'));

app.get('/events', function(req, res) {
	request('https://graph.facebook.com/v2.5/Irfantheband/events', function(error, response, body) {
	    console.log('response.statusCode ', response.statusCode);
	    if (!error && response.statusCode == 200) {
	        console.log(body);
	        res.send(body);
	    }
	});
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});