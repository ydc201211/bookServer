var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/IndexRoutes');
var user = require('./routes/UserRoutes');
var book = require('./routes/BookRoutes');
var login = require('./routes/LoginRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));
app.use(cookieParser());
app.use(session({
  name:'bookdownload.com',
  secret: generateMixed(5),
  cookie:{ path:'/', httpOnly: true, secure: false, maxAge: 60000 + 8*60*60*1000},
  resave:true,
  saveUninitialized:false
}));

app.use('/public',express.static(path.join(__dirname, '/public')));
app.use('/app',express.static(path.join(__dirname, '/app')));

app.use('/',index,login);
app.use('/user', user);
app.use('/book', book);

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
  res.render('error');
});

app.use(function(req,res,next){
  if (!req.session.user) {
    if(req.url=="/login"){
      console.log(req.url);
      next();//如果请求的地址是登录则通过，进行下一个请求
    }else{
      res.redirect('/index.html');
    }
  }else if (req.session.user) {
      next();
  }
});


function generateMixed(n) {
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var res = "";
  for(var i = 0; i < n ; i ++) {
      var id = Math.ceil(Math.random()*35);
      res += chars[id];
      // console.log(chars[id]);
  }
  return res;
}

module.exports = app;
