const path = require('path');
const appPath = path.join(__dirname, '..', 'client/dist/client');

// Server
const express = require('express');
const app = express();
const compression = require('compression');

// Websocket Related
const expressWs = require('express-ws')(app);
const webSocketCallback = require('./api/websocket').webSocketCallback;

app.use(compression());
app.use(express.json());
app.use(express.static(appPath));
app.use((req, res) => {
  res.sendFile(path.join(appPath, 'index.html'));
});

app.get('/', (req, res, next) => {
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', webSocketCallback);

app.listen(3000);