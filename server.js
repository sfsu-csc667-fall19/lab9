const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

const broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Someone has connected');
  broadcastMessage('someone has connected!');

  ws.on('message', (message) => {
    console.log(message);
  });

  ws.on('close', () => {
    broadcastMessage('someone has disconnected!');
    console.log('someone has disconnected!');
  });

  ws.on('error', (e) => {
    console.log(e);
  });
});
