import authReducer from "./index";
import popupReducer from "./popup";
import dataReducer from "./datapreview";

import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: { auth: authReducer, popup: popupReducer, data: dataReducer },
});
export default store;
