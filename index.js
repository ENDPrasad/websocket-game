// For websocket, we need ws library
const WebSocket = require("ws");

// Creating a websocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Listening for connection
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Listening for a message from the connection/client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Sending the responses to the all the other connections/clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    // ws.send(`You sent: ${message}`);
  });
});
