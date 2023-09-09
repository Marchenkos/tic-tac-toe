import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DialogContent } from '../components/ui/dialog.ui';

export interface DialogState {
  content?: DialogContent;
  active: boolean;
}

const initialState: DialogState = {
  content: undefined,
  active: false,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showDialog: (state: DialogState, action: PayloadAction<{ content: DialogContent }>) => {
      state.active = true;
      state.content = action.payload.content;
    },
    hideDialog: (state: DialogState) => {
      state.content = undefined;
      state.active = false;
    },
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
