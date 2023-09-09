import { createSelector, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GameMode, GameSettingsState, Player } from '../game-settings.slice';

export const getGameSettingsSelector: Selector<RootState, GameSettingsState> = createSelector(
  (state: RootState) => state.gameSettings,
  (gameSettings) => gameSettings
);

export const getBoardSizeSelector: Selector<RootState, number> = createSelector(
  getGameSettingsSelector,
  (gameSettings) => gameSettings.boardSize
);

export const getGameModeSelector: Selector<RootState, GameMode> = createSelector(
  getGameSettingsSelector,
  (gameSettings) => gameSettings.gameMode
);

export const getSecondPlayerSelector: Selector<RootState, Player> = createSelector(
  getGameSettingsSelector,
  (gameSettings) => gameSettings.secondPlayer
);

export const getFirstPlayerSelector: Selector<RootState, Player> = createSelector(
  getGameSettingsSelector,
  (gameSettings) => gameSettings.firstPlayer
);

export const getIsAudioTurnOn: Selector<RootState, boolean> = createSelector(
  getGameSettingsSelector,
  (gameSettings) => gameSettings.audio
);
