import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: null,
  reducers: {
    addAlertMsg: (_state, action) => {
      return action.payload;
    },
    removeAlertMsg: () => {
      return null;
    },
  },
});

export const {addAlertMsg, removeAlertMsg} = alertSlice.actions;
export default alertSlice.reducer;
