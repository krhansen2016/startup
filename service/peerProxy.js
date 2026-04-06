const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        socket.on('message', (data) => {
            socketServer.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {client.send(data.toString());}
            });
        });

        socket.on('pong', () => {socket.isAlive = true;});
    });

    setInterval(() => {
        socketServer.clients.forEach((client) => {
            if (client.isAlive === false) return client.terminate();
            client.isAlive = false;
            client.ping();
        });
    }, 10000);

    return socketServer;
}

module.exports = { peerProxy };