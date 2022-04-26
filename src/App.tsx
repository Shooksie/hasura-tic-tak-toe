import React, { useState } from "react";
import { useGameProvider } from "./context/GameProvider";
import GameBoard from "./components/GameBoard/GameBoard";
import { Layout, Button, Input, Typography } from "antd";
const { Content } = Layout;

function App() {
  const { playerTurn, gameActive, startGame } = useGameProvider();
  const [size, setSize] = useState(3);

  return (
    <div className="App">
      <Content className="main-content">
        {gameActive ? (
          <>
            <Typography.Title>
              Current turn player: {playerTurn}
            </Typography.Title>
            <GameBoard />
          </>
        ) : (
          <div>
            <Typography.Title>Welcome to Tic Tak Toe </Typography.Title>

            <Typography>Pick a size for your Board</Typography>
            <Input
              value={size}
              min={3}
              placeholder={"Size"}
              type="number"
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
            <Button onClick={() => startGame(size)}>Start Game</Button>
          </div>
        )}
      </Content>
    </div>
  );
}

export default App;
