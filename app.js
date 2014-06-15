
/**
 * Module dependencies.
 */

var express = require('express')
  , emailroute = require('./routes/email')
  , http = require('http')
  , creds = require('./creds');

var app = express();

// all environments
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if (app.get('env') === 'development') {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.locals.pretty = true;
	app.locals.port = 1083;
}

// production only
if (app.get('env') === 'production') {
	app.use(express.errorHandler());
	app.locals.port = process.env.PORT || 80;
};

/*
 * ERROR HANDLING
 */

var logErrors = function(err, req, res, next) {
	console.error(err.stack);
	next(err);
};

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: err });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

process.on('uncaughtException', function(err) {
	console.log('process died ', err);
});

/**
 * Routes
 */

app.post('/email', emailroute.sendmail);
app.get('/heartbeat', function(req, res) {
	res.json(200, { message: 'Alive'});
})

/**
 * Start Server
 */

http.createServer(app).listen(app.locals.port, function(){
	console.log('Server listening on port ' + app.locals.port);
});