import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  component: "",
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload }) => ({ show: true, ...payload }),
    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
