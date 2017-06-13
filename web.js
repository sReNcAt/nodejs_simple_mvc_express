var app = require('./config/express')();

/*

var https=require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync(__dirname + '/ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/cert.pem')
};
var options2 = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};
https.createServer(options,app).listen('443', function(){
    console.log('SSL Server start : 443');
});

*/

app.listen('8002',function(){
    console.log('Server start : 8002');
});




exports = module.exports = app;
