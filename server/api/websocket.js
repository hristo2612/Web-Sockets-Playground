const webSocketCallback = (ws, req) => {
  ws.on('message', (message) => {
    console.log(message);
  });
  console.log('socket', req.testing);
}

exports.webSocketCallback = webSocketCallback;