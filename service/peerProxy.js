const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;
    })
}