import { useEffect, useState } from 'react';
import styles from './field-styles.module.css';
import classNames from 'classnames';

import { useAppSelector } from '../../store/store';
import { getWinerSelector } from '../../store/selectors/game.selectors';
import { isInDiagonal } from '../utils/board-utils';
import { getBoardSizeSelector } from '../../store/selectors/game-settings.selectors';
import { FieldValue, Direction } from '../../store/game.slice';

interface FieldComponentProps {
  value: FieldValue;
  handleClick: () => void;
  column: number;
  row: number;
}

export const FieldComponent: React.FC<FieldComponentProps> = ({ value, handleClick, column, row }) => {
  const winer = useAppSelector(getWinerSelector);
  const boardSize = useAppSelector(getBoardSizeSelector);

  const fieldSizeStyle = boardSize === 3 ? styles.wrapperDefault : styles.wrapperSmall;

  const [isInWiningSet, setIsInWiningSet] = useState(false);

  useEffect(() => {
    if (winer) {
      switch (winer.direction) {
        case Direction.HORIZONTAL:
          setIsInWiningSet(winer.directionIndex === row);
          break;
        case Direction.VERTICAL:
          setIsInWiningSet(winer.directionIndex === column);
          break;
        default:
          setIsInWiningSet(isInDiagonal(boardSize, winer.directionIndex, column, row));
      }
    }
  }, [column, row, boardSize, winer]);

  return (
    <button
      data-field-value={value}
      onClick={handleClick}
      className={classNames(styles.wrapper, fieldSizeStyle, {
        [styles.match]: isInWiningSet,
        [styles.noMatch]: !isInWiningSet && winer,
      })}
    >
      {FieldValue.NULL !== value && value}
    </button>
  );
};
