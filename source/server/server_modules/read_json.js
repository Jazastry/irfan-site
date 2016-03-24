module.exports = (function() {
    // return new Promise(function(resolve, reject) {
        var data = require('fs').readFileSync('../data/events.json', 'utf8');
        console.log(JSON.parse(data));
    // });
}());
