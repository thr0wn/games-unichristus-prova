var dotenv = require('dotenv');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

// doenv config
dotenv.config({path: path.join(__dirname, '../.env')});

// routes
var routes = require('./src/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../dist'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(express.static(path.join(__dirname, '../dist')));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, '..')));
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('views/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('views/error', {
    message: err.message,
    error: {}
  });
});

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
