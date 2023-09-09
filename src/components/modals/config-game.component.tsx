import React, { memo, useCallback, useState } from 'react';

import styles from './style.module.css';
import { RadioButtonUI } from '../ui/radio-button.ui';
import { ButtonTypesEnum, ButtonUI } from '../ui/button.ui';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { GameMode, updateSettings } from '../../store/game-settings.slice';
import {
  getBoardSizeSelector,
  getGameModeSelector,
  getIsAudioTurnOn,
} from '../../store/selectors/game-settings.selectors';
import { hideDialog } from '../../store/dialog.slice';

export const ConfidGame: React.FC = memo(function ConfidGame() {
  const dispatch = useAppDispatch();
  const currentGameMode = useAppSelector(getGameModeSelector);
  const currentBoardSize = useAppSelector(getBoardSizeSelector);
  const currentAudio = useAppSelector(getIsAudioTurnOn);

  const [gameMode, setGameMode] = useState<GameMode>(currentGameMode);
  const [boardSize, setBoardSize] = useState<number>(currentBoardSize);
  const [audio, setAudio] = useState<boolean>(currentAudio);

  const updateGameMode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGameMode(e.target.value as GameMode);
  }, []);

  const updateBoardSize = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSize(parseInt(e.target.value));
  }, []);

  const updateAudio = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAudio(!!parseInt(e.target.value));
  }, []);

  const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateSettings({
        boardSize,
        gameMode,
        audio,
      })
    );

    dispatch(hideDialog());
  };

  return (
    <form onSubmit={applyChanges} className={styles.wrapper}>
      <div>
        <h2 className={styles.optionsTitle}>Board Size</h2>
        <div className={styles.radioButtonsWrapper}>
          <RadioButtonUI
            name='boardSize'
            label='3'
            value='3'
            checked={boardSize === 3}
            handleChange={updateBoardSize}
          />
          <RadioButtonUI
            name='boardSize'
            label='5'
            value='5'
            checked={boardSize === 5}
            handleChange={updateBoardSize}
          />
        </div>
      </div>

      <div>
        <h2 className={styles.optionsTitle}>Game Mode</h2>
        <div className={styles.radioButtonsWrapper}>
          <RadioButtonUI
            name='gameMode'
            label='With Bot'
            value={GameMode.BOT}
            checked={gameMode === GameMode.BOT}
            handleChange={updateGameMode}
          />
          <RadioButtonUI
            name='gameMode'
            label='With Friend'
            value={GameMode.PLAYER}
            checked={gameMode === GameMode.PLAYER}
            handleChange={updateGameMode}
          />
        </div>
      </div>

      <div>
        <h2 className={styles.optionsTitle}>Audio</h2>
        <div className={styles.radioButtonsWrapper}>
          <RadioButtonUI name='audio' label='On' value={'1'} checked={audio} handleChange={updateAudio} />
          <RadioButtonUI name='audio' label='Off' value={'0'} checked={!audio} handleChange={updateAudio} />
        </div>
      </div>

      <ButtonUI type='submit' label='Apply' style={ButtonTypesEnum.SUCCESS} />
    </form>
  );
});
