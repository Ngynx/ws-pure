const WebSocket = require('ws');
const http = require('http');
const { io } = require('socket.io-client');

// Conectar como cliente al servidor NestJS vía socket.io
const socketNest = io('http://127.0.0.1:3601');

socketNest.on('connect', () => {
  console.log('Conectado a NestJS vía socket.io');
});

socketNest.on('connect_error', (err) => {
  console.error('Error de conexión con NestJS:', err.message);
});

// Crear servidor HTTP base
const server = http.createServer();
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  ws.on('message', (msg) => {
    console.log('Mensaje recibido del cliente WebSocket:', msg.toString());

    try {
      const data = JSON.parse(msg);

      // Enviar al servidor NestJS vía socket.io
      socketNest.emit('gps_data', data);

      // Puedes también confirmar al cliente WebSocket 
      ws.send(JSON.stringify({ status: 'ok', forwarded: true }));
    } catch (err) {
      console.error('Error al parsear mensaje:', err.message);
      ws.send(JSON.stringify({ error: 'Formato JSON inválido' }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

const PORT = 3602;
server.listen(PORT, () => {
  console.log(`Servidor WS puro escuchando en ws://localhost:${PORT}`);
});