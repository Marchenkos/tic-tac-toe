import { forwardRef } from "react";
import classNames from "classnames";

import { FieldComponent } from "./FieldComponent";
import styles from './board-styles.module.css';

import { FieldValue, updateCurrentValue } from "../../store/game.slice";
import { useAppDispatch } from "../../store/store";

interface BoardComponentProps {
  board: FieldValue[][];
  setBoard: (board: FieldValue[][]) => void;
  gameOver: boolean;
  currentValue: FieldValue;
}

export const BoardComponent = forwardRef<HTMLTableSectionElement | null, BoardComponentProps>(function BoardComponent(
  props: BoardComponentProps, ref
) {
  const { board, setBoard, gameOver, currentValue } = props;
  const dispatch = useAppDispatch();

  const setFieldValue = (rowID: number, columnID: number) => {
    if (board[rowID][columnID] === FieldValue.NULL && !gameOver) {
      setBoard(board.map((row, rowIndex) => 
        rowIndex === rowID ? row.map((val, columnIndex) => 
          columnIndex === columnID ? currentValue : val) : row
      ));

      dispatch(updateCurrentValue({
        value: currentValue === FieldValue.O ? FieldValue.X : FieldValue.O
      }))
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={classNames(styles.board)}>
        <tbody ref={ref}>
          {board.map((row, rowIndex) => 
            <tr key={`row_${rowIndex}`}>
              {row.map((value, columnIndex) => 
                <td key={`col_${columnIndex}_row_${rowIndex}_${value}`}>
                  <FieldComponent
                    value={value}
                    row={rowIndex}
                    column={columnIndex}
                    handleClick={() => setFieldValue(rowIndex, columnIndex)} />
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
});
