const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const morgan = require('morgan');
var uuid = require('uuid/v4');
const cookiesMiddleware = require('universal-cookie-express');

const res = (p) => path.resolve(__dirname, p);

const errorHandler = (err, req, res, next) => {
  console.error('server errorHandler', new Date().toUTCString(), err.stack);
  res.status(500).sendFile(path.join(`${__dirname}/500-sv.html`));
  next();
};

function assignId(req, res, next) {
  req.id = uuid();
  next();
}

const logFormat = function(tokens, req, res) {
  const xRequestToken = req.headers && req.headers['x-request-token'];
  const xForwardedHost = req.headers && req.headers['x-forwarded-host'];
  const hostname = tokens.hostname && tokens.hostname(req, res);

  return [
    `ID=${req.id}`,
    new Date().toUTCString(),
    `method=${tokens.method(req, res)}`,
    `url=${tokens.url(req, res)}`,
    `status=${tokens.status(req, res)}`,
    `content_length=${tokens.res(req, res, 'content-length')}`,
    `response_time=${tokens['response-time'](req, res)} ms`,
    `hostname=${hostname}`,
    `x_forwarded_host=${xForwardedHost}`,
    `node_env=${process.env.NODE_ENV}`,
    xRequestToken && `x-request-token=${xRequestToken}`,
  ].join('\t');
};

const app = express();

app.use(compression());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(errorHandler);
// Logging Setup
app.use(assignId);
app.use(morgan(logFormat));
// END Logging
app.use(cookiesMiddleware());

module.exports = {
  app,
};
