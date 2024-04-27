const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
let waitingPlayer = null;

wss.on("connection", function connection(ws) {
  console.log("New client connected");

  if (waitingPlayer) {
    // Pair up the waiting player with the newly connected player
    startGameSession(waitingPlayer, ws);
    waitingPlayer = null;
  } else {
    // No waiting player, add the current player to the waiting list
    waitingPlayer = ws;
    ws.send(
      JSON.stringify({
        board: ".........",
        status: "Waiting for another player to join...",
      })
    );
  }

  ws.on("close", function () {
    console.log("Client disconnected");
    if (waitingPlayer === ws) {
      waitingPlayer = null;
    }
  });
});

function startGameSession(player1, player2) {
  console.log("Starting game session");
  // const gameBoard = ".........";
  // Initialize game session, handle game logic, etc.
  // You can also send a message to both players to start the game
  player2.send(JSON.stringify({ board: ".........", status: "You first" }));
  player1.send(
    JSON.stringify({
      board: ".........",
      status: "Wait for your opponents move",
    })
  );

  player1.on("message", (message) => {
    // const nextSquares = gameBoard.slice()
    // const data = await JSON.parse(await message.toString());
    // console.log(data);
    let [index, board] = message.toString().split(" ");
    console.log(index);
    // board = board.toString().replaceAt(index, "X");
    // board =
    //   board.substring(0, index) +
    //   "X" +
    //   board.substring(index + 1, board.length);
    let arr = board.split("");
    arr[index] = "X";
    if (calculateWinner(arr)) {
      board = arr.join("");
      player1.send(JSON.stringify({ board, status: "You Win" }));
      player2.send(JSON.stringify({ board, status: "You lost" }));
    } else {
      board = arr.join("");
      console.log(board);
      player1.send(
        JSON.stringify({ board, status: "Wait for opponents move" })
      );
      player2.send(JSON.stringify({ board, status: "Your turn" }));
    }
  });

  player2.on("message", (message) => {
    let [index, board] = message.toString().split(" ");
    console.log(index);
    // board = board.toString().replaceAt(index, "O");
    // board =
    //   board.substring(0, index) +
    //   "O" +
    //   board.substring(index + 1, board.length);
    let arr = board.split("");
    arr[index] = "O";
    if (calculateWinner(arr)) {
      board = arr.join("");
      player2.send(JSON.stringify({ board, status: "You Win" }));
      player1.send(JSON.stringify({ board, status: "You lost" }));
    } else {
      board = arr.join("");
      console.log(board);
      player2.send(
        JSON.stringify({ board, status: "Wait for opponents move" })
      );
      player1.send(JSON.stringify({ board, status: "Your turn" }));
    }
  });
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] != "." &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return true;
    }
  }
  return false;
}
