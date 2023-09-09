import { createSelector, Selector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DialogState } from "../dialog.slice";
import { DialogContent } from "../../components/ui/dialog.ui";

export const getDialogSelector: Selector<RootState, DialogState> = createSelector(
  (state: RootState) => state.dialog,
  (dialog) => dialog
);

export const getIsDialogActiveSelector: Selector<RootState, boolean> = createSelector(
  getDialogSelector,
  (dialog) => dialog.active
);

export const getDialogContentSelector: Selector<RootState, DialogContent | undefined> = createSelector(
  getDialogSelector,
  (dialog) => dialog.content
);
