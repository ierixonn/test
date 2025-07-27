const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const users = new Set();

wss.on('connection', (ws) => {
  users.add(ws);
  
  ws.on('message', (message) => {
    // Пересылаем сообщение всем подключенным пользователям
    users.forEach(user => {
      if (user.readyState === WebSocket.OPEN) {
        user.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    users.delete(ws);
  });
});

console.log('Сервер чата запущен на ws://localhost:8080');
