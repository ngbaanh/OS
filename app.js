var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var SiteController = require('./web/controllers/SiteController');
var ApiController = require('./web/controllers/ApiController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

mongoose.connect('localhost:27017/OS');
db = mongoose.connection;

db.on('error', function () {
    throw new Error('Unable to connect to MongoDB at ');
});

db.on('connected', function () {
    console.log('Connected to MongoDB at localhost:27017/OS');
});

// routing controllers
app.get('/', SiteController.homepage);
app.get('/student-list', SiteController.student_list);
app.post('/tableStudent', SiteController.table_student);
app.get('/add-student', SiteController.add_student);
app.post('/add-student', SiteController.send_student_info);
app.post('/student/delete_student', SiteController.delete_student);
app.get('/student-detail', SiteController.student_detail);
app.post('/edit-student', SiteController.edit_student);
app.get('/video-api/upload', ApiController.video_api_upload);
app.get('/video-api/wait-for-result', ApiController.video_api_wait_for_result);
app.get('/video-api/test', ApiController.sample_detection);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('site/error', {err:err});
});

module.exports = app;
