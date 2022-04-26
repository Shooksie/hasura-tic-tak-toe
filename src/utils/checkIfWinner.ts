import { Board } from "../types/types";

const checkIfWinner = (
  moveCount: number,
  board: Board,
  x: number,
  y: number
) => {
  const size = board.length;

  let col = 0;
  let row = 0;
  let diag = 0;
  let rdiag = 0;

  for (let i = 0; i < size; i++) {
    if (board[i][x] === board[y][x]) {
      col++;
    }
    if (board[y][i] === board[y][x]) {
      row++;
    }
    if (board[i][i] === board[y][x]) {
      diag++;
    }
    if (board[i][size - i + 1] === board[y][x]) {
      rdiag++;
    }
  }

  return col === size || row === size || diag === size || rdiag === size;
};

export default checkIfWinner;
