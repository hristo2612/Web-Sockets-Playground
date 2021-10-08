const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const webSocketCallback = require('./api/websocket').webSocketCallback;

app.use((req, res, next) => {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', (req, res, next) => {
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', webSocketCallback);

app.listen(3000);