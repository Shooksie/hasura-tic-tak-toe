import { useGameProvider } from "../../context/GameProvider";
import BoardRow from "./BoardRow";
import styled from "styled-components";

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const GameBoard = () => {
  const { boardState } = useGameProvider();

  return (
    <StyledBoard>
      {boardState.map((row, rowIndex) => (
        <BoardRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </StyledBoard>
  );
};

export default GameBoard;
