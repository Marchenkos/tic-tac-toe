import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum FieldValue {
  X = 'X',
  O = 'O',
  NULL = 'null',
}

export enum Direction {
  VERTICAL,
  HORIZONTAL,
  DIAGONAL,
}

export interface Winer {
  value: FieldValue;
  direction: Direction;
  directionIndex: number;
}

export interface GameState {
  winer?: Winer;
  currentValue: FieldValue.O | FieldValue.X;
}

const initialState: GameState = {
  winer: undefined,
  currentValue: FieldValue.X,
};

export const gameSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    updateWiner: (state: GameState, action: PayloadAction<{ winer: Winer }>) => {
      state.winer = action.payload.winer;
    },
    resetWiner: (state: GameState) => {
      state.winer = undefined;
    },
    updateCurrentValue: (state: GameState, action: PayloadAction<{ value: FieldValue.O | FieldValue.X }>) => {
      state.currentValue = action.payload.value;
    },
  },
});

export const { updateWiner, resetWiner, updateCurrentValue } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
