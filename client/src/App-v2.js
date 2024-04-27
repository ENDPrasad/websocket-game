import logo from "./logo.svg";
import "./App.css";

import WebSocket from "websocket";
import { useState, useEffect } from "react";
import Board from "./components/Board";

function AppV2() {
  const [message, setMessage] = useState(".........");
  const [status, setStatus] = useState("");
  // const [receivedMessage, setReceivedMessage] = useState(Array(9).fill(null));
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Creating a websocket client side to interact with the backend websocket
    const wsClient = new WebSocket.w3cwebsocket("ws://localhost:8080/");

    //
    wsClient.onopen = () => {
      console.log("Websocket client connected");
    };

    wsClient.onmessage = async (message) => {
      console.log(message);
      if (typeof message.data == "string") {
        let data = JSON.parse(await message.data);
        // if (data[0] == "." || data[0] == "O" || data[0] == "X") {
        // const d = data.split("");
        console.log(data);
        setMessage(data.board);
        setStatus(data.status);
        // }
      } else {
        let data = await message.data.text();
        if (data[0] == "." || data[0] == "O" || data[0] == "X") {
          // const d = data.split("");

          console.log(data);

          setMessage(data);
        }
      }
    };

    setClient(wsClient);

    return () => {
      wsClient.close();
    };
  }, []);

  // const sendMessage = () => {
  //   console.log(`sending: ${message}`);
  //   client.send(message);
  //   setMessage("");
  // };

  const onClickHandler = (d) => {
    // setMessage(()=> message)
    // const nextSquares = message.slice();
    // nextSquares[d] = "X";
    // setMessage(nextSquares);
    let mix = d + " " + message.toString();
    console.log(mix);
    client.send(mix);
  };

  return (
    <div className="App">
      <h1>WebSocket Demo</h1>
      <h3>{status}</h3>
      <Board boardData={message} onClickHandler={onClickHandler} />
    </div>
  );
}

export default AppV2;
