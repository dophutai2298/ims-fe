import { createSlice } from "@reduxjs/toolkit";
const initiaPopupState = {
  showModal: false,
  data: null,
  showPreview: false,
};
const popUpSlice = createSlice({
  name: "popup",
  initialState: initiaPopupState,
  reducers: {
    show(state) {
      state.showModal = true;
    },
    hide(state) {
      state.showModal = false;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    showPreview(state) {
      state.showPreview = true;
    },
    hidePreview(state) {
      state.showPreview = false;
    },
  },
});
export const popUpActions = popUpSlice.actions;
export default popUpSlice.reducer;
