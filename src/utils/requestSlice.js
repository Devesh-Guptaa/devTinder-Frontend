import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: null,
  reducers: {
    addRequests(state, action) {
      return action.payload;
    },
    removeRequest(state, action) {
      const _id = action.payload;
      console.log(_id);

      const newArray = state.filter((req) => req._id !== _id);
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
