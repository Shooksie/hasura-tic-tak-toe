import { BoardCell, BoardRow as BoardRowT, Players } from "../../types/types";
import styled, { css } from "styled-components";
import { useGameProvider } from "../../context/GameProvider";

interface GameRowProps {
  row: BoardRowT;
  rowIndex: number;
}

interface CardCellProps {
  size: number;
  x: number;
  y: number;
}

const ComputerBorders = ({ size, x, y }: CardCellProps) => {
  return css`
    border-top-width: ${y !== 0 ? "1px" : 0};
    border-bottom-width: ${y !== size - 1 ? "1px" : 0};
    border-left-width: ${x !== 0 ? "1px" : 0};
    border-right-width: ${x !== size - 1 ? "1px" : 0};
  `;
};

const CardCell = styled.div<{ size: number; x: number; y: number }>`
  height: 10vh;
  width: 10vh;
  border-width: 4px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;

  ${ComputerBorders}
  :hover {
    background-color: gray;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const renderCellValue = (value: BoardCell) => {
  if (value === Players.ONE) {
    return "X";
  }

  if (value === Players.TWO) {
    return "O";
  }

  return null;
};
const BoardRow = ({ row, rowIndex }: GameRowProps) => {
  const BoardSize = row.length;

  const { playTurn } = useGameProvider();

  return (
    <RowWrapper>
      {row.map((cell, cellIndex) => (
        <CardCell
          key={`${rowIndex}_${cellIndex}`}
          size={BoardSize}
          x={cellIndex}
          y={rowIndex}
          onClick={!cell ? () => playTurn(cellIndex, rowIndex) : undefined}
        >
          {renderCellValue(cell)}
        </CardCell>
      ))}
    </RowWrapper>
  );
};

export default BoardRow;
