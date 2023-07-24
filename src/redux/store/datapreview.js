import { createSlice } from "@reduxjs/toolkit";
const initiaDataPreview = {
  dataPreview: null,
};
const dataSlice = createSlice({
  name: "data",
  initialState: initiaDataPreview,
  reducers: {
    setDataPreview(state, action) {
      state.dataPreview = action.payload;
    },
  },
});
export const dataAction = dataSlice.actions;
export default dataSlice.reducer;
