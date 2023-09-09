import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';
import { gameSettingsReducer } from './game-settings.slice';
import { dialogReducer } from './dialog.slice';
import { gameReducer } from './game.slice';

export const store = configureStore({
  reducer: {
    gameSettings: gameSettingsReducer,
    dialog: dialogReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
