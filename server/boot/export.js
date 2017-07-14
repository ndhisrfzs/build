var csv = require('csv');
var fs = require('fs');
var path = require('path');

module.exports = function (server) {
    var router = server.loopback.Router();

    router.get('/export_gift', function (req, res, next) {
        var fname = req.query['name'] || 'gift';
        var filename = req.query['filename'] || '1.txt';
        var stream;

        stream = fs.createReadStream(path.join('gifts', filename));
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream;charset=utf8',
            'Coneten-Length': 100,
            'Content-Disposition': "attachment; filename=\"" + encodeURIComponent(fname + '.csv') + "\""
        });
        stream.pipe(csv.parse())
            .pipe(csv.stringify())
            .pipe(res);
        stream.on('error', function (err) {
            next(err);
        });
    });
    server.use(router);
};
