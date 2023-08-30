import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
  selectedBoards: string[];
}

const initialState: SelectionState = {
  selectedBoards: [],
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectBoard: (state, action: PayloadAction<string>) => {
      if (!state.selectedBoards.includes(action.payload)) {
        state.selectedBoards.push(action.payload);
      }
    },

    deselectBoard: (state, action: PayloadAction<string>) => {
      state.selectedBoards = state.selectedBoards.filter(
        (id) => id !== action.payload
      );
    },

    clearSelection: (state) => {
      state.selectedBoards = [];
    },
  },
});

export const { selectBoard, deselectBoard, clearSelection } =
  selectionSlice.actions;

export default selectionSlice.reducer;
