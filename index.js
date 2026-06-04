const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Client verbunden");

  socket.on("message", (msg) => {
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    }
  });
});

const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
