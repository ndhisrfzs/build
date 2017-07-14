var loopback = require('loopback');
var boot = require('loopback-boot');
var https = require('https');
var app = module.exports = loopback();
var favicon = require('serve-favicon');
var fs = require('fs');

//var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
//var passportConfigurator = new PassportConfigurator(app);
var options = {
    key: fs.readFileSync('./server/key/ttmanage.shijianvip.com.key'),
    cert: fs.readFileSync('./server/key/ttmanage.shijianvip.com_bundle.crt'),
};

app.start = function() {

  https.createServer(options, app).listen(443);
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
//console.log(__dirname);
app.use(favicon(__dirname + '/favicon.ico'));
//
//app.use(loopback.session({ secret: 'keyboard cat' }));
//var config = {};
//try {
//  config = require('./providers.json');
//} catch(err) {
//  console.error('Please configure your passport strategy in `providers.json`.');
//  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
//  process.exit(1);
//}
//// Initialize passport
//passportConfigurator.init();
