var express = require('express');
var ev = require('./server_modules/events.js');
var app = express();
var events = [];

// serve public files
app.use(express.static('../public'));

ev.subscribe(function(data){
	events = data;
});

app.get('/events', function(req, res) {
    res.send(events);
});

app.get('/event', function(req, res) {

});

var server = app.listen(8080, function() {
    console.log('listening on port 8080!');
});
