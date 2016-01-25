var debug = require('debug')('my-application');
var express = require('express');
var path = require('path');
var cors = require('cors');
var favicon = require('static-favicon');
var flash = require("connect-flash");
var session = require("express-session");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");



var users = require('./routes/users');
var company = require('./routes/company');
var signUp = require('./routes/signup');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(favicon());
app.use(cors());
//app.use(logger('dev'));
app.use(bodyParser.json({limit: '500kb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '500kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
/*app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));*/
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/company', company);
app.use('/account', signUp);

/// catch 404 and forwarding to error handler
/*app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });*/

/// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err
 });
 });
 }*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: {}
 });
 });*/

/*app.get("/check", function (req, res) {
    req.session.cookie.name = req.isAuthenticated()+" " + new Date();
    console.log(req.session);
    console.log(req.isAuthenticated());
    res.send(passport);
});*/

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});


//app.listen(8000);
//module.exports = app;
