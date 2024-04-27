import logo from "./logo.svg";
import "./App.css";

import WebSocket from "websocket";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Creating a websocket client side to interact with the backend websocket
    const wsClient = new WebSocket.w3cwebsocket("ws://localhost:8080/");

    //
    wsClient.onopen = () => {
      console.log("Websocket client connected");
    };

    wsClient.onmessage = async (message) => {
      // console.log(message);
      if (typeof message.data == "string") {
        let data = await message.data;
        setReceivedMessage(data);
      } else {
        let data = await message.data.text();
        setReceivedMessage(data);
      }
    };

    setClient(wsClient);

    return () => {
      wsClient.close();
    };
  }, []);

  const sendMessage = () => {
    console.log(`sending: ${message}`);
    client.send(message);
    setMessage("");
  };

  return (
    <div className="App">
      <h1>WebSocket Demo</h1>
      {/* <h1>WebSocket Demo</h1> */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Received Message:</h2>
        <p>{receivedMessage}</p>
      </div>
    </div>
  );
}

export default App;
