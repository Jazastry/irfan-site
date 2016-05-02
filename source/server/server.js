try {
    // express initialization
    var express = require('express');
    var _events = require('./server_modules/events.js');
    var _audio = require('./server_modules/audio.js');
    var app = express();
    var serverPort = 9999;

    // serve public files
    app.use(express.static('../public'));

    app.get('/events', function(req, res) {
    	_events.getEvents(function(events){
    		console.log('GET EVENTS - events.len \r\n', events.length);
    		res.send(events);
    	});        
    });

    app.get('/event', function(req, res) {

    });

    app.get('/audio', function(req, res) {
        _audio.init(req, res);
    });

    var server = app.listen(serverPort, function() {
        console.log('listening on port ', serverPort);
    });
} catch (er) {
    console.error('server.js');
    console.error(er);
}
