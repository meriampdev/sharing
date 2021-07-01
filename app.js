var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var nonSPArouter = require('./routes/nonSPArouter')
var app = express();


/**
 *  create dist or build folder for react app build
 *  or point to where app build is
 */
app.use(express.static((path.join(__dirname + '/dist'))));
app.use(express.static("public"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req,res,next) { 
  console.log('headers', req.headers)
  var ua = req.headers['user-agent'];
  if (/^(facebookexternalhit|twitterbot)/gi.test(ua)) {
     nonSPArouter(req,res,next);
  } else {
    next();
  } 
});

//this should be your very last route - it will hand all non-crawler users your index.html file (that includes the links to your app files - the vendor.js, app.js etc. files deployed on cloud distribution system such as Amazon S3 + cloudfront)
// MAIN CATCHALL ROUTE --------------- 
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 3001);

module.exports = app;
