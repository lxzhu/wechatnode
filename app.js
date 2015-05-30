var runtime = require('./rt.js');

(function() {
	var log4js = require('log4js');
	log4js.configure({
		appenders : [ {
			type : 'console'
		}, {
			type : 'file',
			filename : 'logs/access.log',
			maxLogSize : 1024,
			backups : 4,
			category : 'normal'
		} ],
		replaceConsole : true
	});
}());

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var redirect = require('express-redirect');
var session = require('express-session');


var app = express();
redirect(app);

app.set('port', process.env.PORT || runtime.config.website.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// favicon is removed. could use https://www.npmjs.org/package/static-favicon
// app.use(express.favicon());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended : true
}))

app.use(bodyParser.json())
app.use(session({
	resave:false,
	saveUninitialized:false,
	secret:"i am zhuliangxiong"
}));
app.use('/html', express.static(path.join(__dirname, 'pubs')));
app.redirect('/html', '/html/index.html');
app.redirect('/html/', '/html/index.html');
app.redirect('/', '/html/index.html');

require('./api/moment.js')(app);
require('./api/image.js')(app);
require('./api/user.js')(app);

http.createServer(app).listen(app.get('port'), function(error) {
	if (error) {
		console.log(error);
	}else{
		console.log("nodejs is running at "+app.get('port'));
	}
});
