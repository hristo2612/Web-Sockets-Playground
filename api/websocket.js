const webSocketCallback = (expressWs) => (ws, req) => {
  ws.on('message', (message) => {
    console.log(message);
    const allClients = expressWs.getWss().clients;
    allClients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        const data = JSON.parse(message).data;
        client.send(JSON.stringify({
          text: data.text,
          userName: data.userName,
        }));
      }
    });
  });
}

exports.webSocketCallback = webSocketCallback;