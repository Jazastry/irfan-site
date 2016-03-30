try {
    var express = require('express');
    var ev = require('./server_modules/events.js');
    var app = express();
    var serverPort = 9999;

    // serve public files
    app.use(express.static('../public'));

    app.get('/events', function(req, res) {
    	ev.getEvents(function(events){
    		console.log('GET EVENTS - events.len \r\n', events.length);
    		res.send(events);
    	});        
    });

    app.get('/event', function(req, res) {

    });

    var server = app.listen(serverPort, function() {
        console.log('listening on port ', serverPort);
    });
} catch (er) {
    console.error('server.js');
    console.error(er);
}
