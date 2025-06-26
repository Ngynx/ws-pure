const WebSocket = require('ws');
const http = require('http');
const { io } = require('socket.io-client');
const config = require('./config');

const socketNest = io(config.nestHost);

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

  ws.on('message', (msg, isBinary) => {
    console.log('Mensaje recibido del cliente WebSocket:', msg.toString());
    try {
      
      if (isBinary) {
        console.warn('Mensaje binario recibido, ignorado o debe ser manejado');
        return;
      };


      const text = msg.toString();
      const data = JSON.parse(text);

      // Enviar al servidor NestJS vía socket.io
      socketNest.emit(config.nestChannel, data);

      // Enviar confirmación liberando el event loop
      if (ws.readyState === WebSocket.OPEN) {
        setImmediate(() => {
          ws.send(JSON.stringify({ status: 'ok', forwarded: true }));
        });
      }
      
    } catch (err) {
      console.error('Error al parsear mensaje:', err.message);
      ws.send(JSON.stringify({ error: 'Formato JSON inválido' }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });

  ws.on('error', (err) => {
    console.error('Error en conexión WebSocket:', err.message);
  });
});

server.listen(config.port, '0.0.0.0', () => {
  console.log(`Servidor WS puro escuchando en ws://localhost:${config.port}`);
});