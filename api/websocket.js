const webSocketCallback = (expressWs) => (ws, req) => {
  ws.on('message', (message) => {
    console.log(message);
    const allClients = expressWs.getWss().clients;
    allClients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({
          msg: JSON.parse(message).body,
          time: new Date().toISOString(),
        }));
      }
    });
  });
}

exports.webSocketCallback = webSocketCallback;