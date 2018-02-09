var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser');
var morgan = require('morgan');
var winston = require('winston');

// setup parser for request body content
app.use(bodyParser.urlencoded({
	extended: true
}));

//=========================== write log to file ================================
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level:            'debug',
      filename:         './all-logs.log',
      handleExceptions: true,
      json:             false,
      maxsize:          104857600, //100MB
      maxFiles:         10,
      colorize:         false
    })
    ,
    new winston.transports.Console({
      level:            'debug',
      handleExceptions: true,
      json:             false,
      colorize:         true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

app.use(morgan(
	'{"remote_addr": ":remote-addr", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: logger.stream}));
//=========================== write log to file ================================

// get our predefined file
var config = require('./config');
var errcode = require('./errcode');
var utils = require('./utils');
var enums = require('./enums');

// Load model and sequelize
var sequelize = require('./sequelize');
var M = require('./model');

app.set('super_secret', config.super_secret); // secret variable
app.set('utils',utils);
app.set('errcode',errcode);
app.set('enums',enums);

require('./routes')(app,config,M,sequelize,express);

server.listen(config.PORT, function(){
  console.log('Express server listening on port ' + config.PORT);
});

// MONITOR app
var probe = require('pmx').probe();
var counter = 0;
var metric = probe.metric({
  name    : 'Realtime user',
  value   : function() {
    return counter;
  }
});
setInterval(function() {
  counter++;
}, 100);
