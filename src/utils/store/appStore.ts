import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import alertReducer from "./alertSlice";

const appStore = configureStore({
  reducer: {
    admin: adminReducer,
    alert: alertReducer,
  },
});

export default appStore;
