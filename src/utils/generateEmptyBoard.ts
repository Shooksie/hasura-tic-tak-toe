import { Board, BoardRow } from "../types/types";

// size refers to N X N
const generateEmptyRow = (size: number): BoardRow => {
  return (new Array(size) as BoardRow).fill(null, 0, size);
};

// size refers to N X N
const createEmptyBoard = (size: number): Board => {
  return (new Array(size) as Board).fill(generateEmptyRow(size), 0, size);
};

export { createEmptyBoard, generateEmptyRow };
