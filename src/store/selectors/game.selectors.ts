import { createSelector, Selector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Winer, GameState, FieldValue } from "../game.slice";

export const getGameSelector: Selector<RootState, GameState> = createSelector(
  (state: RootState) => state.game,
  (game) => game
);

export const getWinerSelector: Selector<RootState, Winer | undefined> = createSelector(
  getGameSelector,
  (game) => game.winer
);

export const getCurrentValueSelector: Selector<RootState, FieldValue.O | FieldValue.X> = createSelector(
  getGameSelector,
  (game) => game.currentValue
);
