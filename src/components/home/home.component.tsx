import { useCallback } from 'react';

import styles from './styles.module.css';
import { ButtonUI } from '../ui/button.ui';

interface HomeComponentProps {
  startGame: () => void;
}

export const HomeComponent: React.FC<HomeComponentProps> = ({ startGame }) => {
  const startNewGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.gameName}>Tic Tac Toe</h1>

      <ButtonUI label='New Game!' handleClick={startNewGame} />
    </div>
  );
};
