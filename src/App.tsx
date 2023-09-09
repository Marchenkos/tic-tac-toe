import { useCallback, useState } from 'react';

import styles from './App.module.css';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/GameComponent';
import { HeaderComponent } from './components/header/header.component';
import { DialogUI } from './components/ui/dialog.ui';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const stopGame = useCallback(() => {
    setIsStarted(false);
  }, []);

  const startGame = useCallback(() => {
    setIsStarted(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <HeaderComponent isGameStarted={isStarted} stopGame={stopGame} />

      {isStarted ? <GameComponent /> : <HomeComponent startGame={startGame} />}

      <DialogUI />
    </div>
  );
}

export default App;
