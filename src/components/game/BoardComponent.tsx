import { forwardRef } from 'react';
import classNames from 'classnames';

import { FieldComponent } from './FieldComponent';
import styles from './board-styles.module.css';

import { FieldValue, updateCurrentValue } from '../../store/game.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

import clickSound from '../../assets/click.mp3';
import { getWinerSelector } from '../../store/selectors/game.selectors';
import { useAudio } from '../../hooks/useAudio.hook';

interface BoardComponentProps {
  board: FieldValue[][];
  setBoard: (board: FieldValue[][]) => void;
  gameOver: boolean;
  currentValue: FieldValue;
}

export const BoardComponent = forwardRef<HTMLTableSectionElement | null, BoardComponentProps>(function BoardComponent(
  props: BoardComponentProps,
  ref
) {
  const { board, setBoard, gameOver, currentValue } = props;
  const winer = useAppSelector(getWinerSelector);
  const clickAudio = useAudio(clickSound, {});

  const dispatch = useAppDispatch();

  const setFieldValue = (rowID: number, columnID: number) => {
    if (board[rowID][columnID] === FieldValue.NULL && !gameOver) {
      setBoard(
        board.map((row, rowIndex) =>
          rowIndex === rowID ? row.map((val, columnIndex) => (columnIndex === columnID ? currentValue : val)) : row
        )
      );

      clickAudio.play();

      dispatch(
        updateCurrentValue({
          value: currentValue === FieldValue.O ? FieldValue.X : FieldValue.O,
        })
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={classNames(styles.board, { [styles.gameOver]: !winer && gameOver })}>
        <tbody ref={ref}>
          {board.map((row, rowIndex) => (
            <tr key={`row_${rowIndex}`}>
              {row.map((value, columnIndex) => (
                <td key={`col_${columnIndex}_row_${rowIndex}_${value}`}>
                  <FieldComponent
                    value={value}
                    row={rowIndex}
                    column={columnIndex}
                    handleClick={() => setFieldValue(rowIndex, columnIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
