import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FieldValue } from "./game.slice";

export enum GameMode {
  BOT = 'bot',
  PLAYER = 'player'
}

export enum PlayerType {
  BOT = 'bot',
  FRIEND = 'friend',
  YOU = 'you'
}

export interface Player {
  type: PlayerType;
  fieldValue: FieldValue.O | FieldValue.X;
}

export interface GameSettingsState {
  boardSize: number;
  gameMode: GameMode;
  firstPlayer: Player;
  secondPlayer: Player;
  audio: boolean;
}

const initialState: GameSettingsState = {
  boardSize: 3,
  audio: true,
  gameMode: GameMode.BOT,
  firstPlayer: {
    type: PlayerType.YOU,
    fieldValue: FieldValue.X
  },
  secondPlayer: {
    type: PlayerType.BOT,
    fieldValue: FieldValue.O
  }
}
interface UpdateSettingsPayload {
  gameMode: GameMode;
  boardSize: number;
  audio: boolean;
}

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    updateSettings: (state: GameSettingsState, action: PayloadAction<UpdateSettingsPayload>) => {
      state.boardSize = action.payload.boardSize;
      state.gameMode = action.payload.gameMode;
      state.audio = action.payload.audio;

      if (action.payload.gameMode === GameMode.BOT) {
        state.secondPlayer = { ...state.secondPlayer, type: PlayerType.BOT }
      } else {
        state.secondPlayer = { ...state.secondPlayer, type: PlayerType.FRIEND }
      }
    }
  }
})

export const { updateSettings } = gameSettingsSlice.actions
export const gameSettingsReducer = gameSettingsSlice.reducer;
