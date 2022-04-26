import { createContext, FC, useContext, useEffect, useState } from "react";

import { Board, Players } from "../types/types";
import { createEmptyBoard } from "../utils/generateEmptyBoard";
import checkIfWinner from "../utils/checkIfWinner";

const DEFAULT_BOARD_SIZE = 3;
const DEFAULT_MOVE_COUNT = 0;

interface GameProviderContext {
  playerTurn?: Players;
  gameActive?: boolean;
  boardState: Board;
  startGame: (size: number) => void;
  playTurn: (x: number, y: number) => void;
  setSize: (size: number) => void;
}

const GameContext = createContext<GameProviderContext | null>(null);

const GameProvider: FC = ({ children }) => {
  const [boardState, setBoardState] = useState(
    createEmptyBoard(DEFAULT_BOARD_SIZE)
  );
  const [moveCount, setMoveCount] = useState(DEFAULT_MOVE_COUNT);

  const [playerTurn, setPlayerTurn] = useState<Players>(Players.ONE);
  const [gameActive, setGameActive] = useState(false);

  const startGame = (size: number) => {
    setBoardState(createEmptyBoard(size));
    setGameActive(true);
  };

  const updateBoard = (board: Board, x: number, y: number) => {
    return board.map((row, rowI) =>
      rowI === y
        ? row.map((cell, cellI) => (cellI === x ? playerTurn : cell))
        : row
    );
  };

  const endGame = () => {
    setBoardState(createEmptyBoard(boardState.length));
    setMoveCount(DEFAULT_MOVE_COUNT);
    setGameActive(false);
  };

  const playTurn = (x: number, y: number) => {
    const newCountMove = moveCount + 1;
    const board = updateBoard(boardState, x, y);

    if (checkIfWinner(moveCount + 1, board, x, y)) {
      alert(`Alert, Player ${playerTurn} won`);
      endGame();
      setPlayerTurn(playerTurn);
    } else {
      setMoveCount(newCountMove);
      setBoardState(board);
      setPlayerTurn((curr) => {
        if (curr === Players.ONE) {
          return Players.TWO;
        }
        return Players.ONE;
      });
    }
  };

  useEffect(() => {
    if (moveCount === Math.pow(boardState.length, 2)) {
      alert("Game tied");
      endGame();
      setPlayerTurn(Players.ONE);
    }
  }, [moveCount, boardState]);

  const setSize = (size: number) => {
    setBoardState(createEmptyBoard(size));
  };

  return (
    <GameContext.Provider
      value={{
        gameActive,
        boardState,
        startGame,
        setSize,
        playerTurn,
        playTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameProvider = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Please ensure component is wrapped within context");
  }
  return context;
};

export default GameProvider;
