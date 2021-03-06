'use strict';

let mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Promise = require('bluebird'),
  compare = Promise.promisify(require('bcrypt').compare);

//database connection
mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;
mongoose.Promise = Promise;
db.on('open', () => console.log('Database Connected'));
db.on('error', () => console.error('Error connecting to database'));

//include models
require('./models/account');
require('./models/employee');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
let session = require('express-session');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//enable Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, next) => {
  let Account = mongoose.model('Account');
  Account.findOne({email})
    .then(account => {
      if (!account) {
        next(new Error('Could not find user with provided email'));
      } else {
        //we have an account
        compare(password, account.password)
          .then(result => {
            if (result) {
              next(null, account);
            } else {
              next(new Error('Could not find Account with that username / password.'));
            }
          })
          .catch(next);
      }
    })
    .catch(next);
}));

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((user, next) => {
  next(null, user);
});

app.use('/', require('./routes/index'));
app.use('/employee-list', require('./routes/employee-list'));
app.use('/new-account', require('./routes/new-account'));
app.use('/login', require('./routes/login'));
app.use('/new-employee', require('./routes/new-employee'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
