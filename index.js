const path = require('path');
const appPath = path.join(__dirname, 'client/dist/client');
const port = process.env.PORT || 3000;

// Server
const express = require('express');
const app = express();
const compression = require('compression');

// Websocket Related
const expressWs = require('express-ws')(app);
const webSocketCallback = require('./api/websocket').webSocketCallback;

app.ws('/api', webSocketCallback(expressWs));

const appMiddleware = [
  compression(),
  express.json(),
  express.static(appPath),
  (req, res) => {
    res.sendFile(path.join(appPath, 'index.html'));
  }
];

app.use('/', appMiddleware);

app.listen(port);