import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    addAdmin: (_state, action) => {
      return action.payload;
    },
    removeAdmin: (_state, _action) => {
      return null;
    },
  },
});

export const { addAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;
