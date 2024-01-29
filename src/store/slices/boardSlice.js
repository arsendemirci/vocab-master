import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    word: [],
    isOverflow: false,
  },
  reducers: {
    addChar: (state, { payload }) => {
      state.word.push(payload.char);
    },
    deleteChar: (state) => {
      state.word.splice(-1);
    },
    setOverflowFlag: (state, { payload }) => {
      state.isOverflow = payload.isOverflow;
    },
    submitAnswer: (state) => {
      state.word.length = 0;
    },
  },
});

export const { addChar, setOverflowFlag, deleteChar, submitAnswer } =
  boardSlice.actions;
export default boardSlice.reducer;
