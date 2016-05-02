module.exports = (function() {
    var fs = require('fs');

    function AudioPlayer() {
    }

    AudioPlayer.prototype.init = function(req, res) {
        console.log('req.query ' , req.query);
        var query = req.query;
        console.log('query ' , query);
        var album = query.album ? query.album + '/' : '';
        var song = query.song ? query.song + '.mp3' : false;
        var filePath = './media/' + album + song;
        var fileStat = fs.statSync(filePath);

        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Length', fileStat.size);

        var read = fs.createReadStream('./media/' + album + song);
        read.pipe(res);
    };

    return new AudioPlayer();
}());
