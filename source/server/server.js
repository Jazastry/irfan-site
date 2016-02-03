var express = require('express');
var request = require('request');
var app = express();
app.use(express.static('../public'));

var optionsEvents = {
  url: 'https://graph.facebook.com/v2.5/Irfantheband/events',
  headers: {
    'Cookie': ''
  }
};


app.get('/events', function(req, res) {
	request(optionsEvents, function(error, response, body) {
	console.log('response ' , response.body);
	    if (!error && response.statusCode == 200) {
	    	var data = JSON.parse(response.body);
	    	response.body = JSON.stringify(data.data);
	        res.send(response);
	    }
	});
});


app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});