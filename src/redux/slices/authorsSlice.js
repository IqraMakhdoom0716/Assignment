import { createSlice } from '@reduxjs/toolkit';

const authorsSlice = createSlice({
  name: 'authors',
  initialState: [],
  reducers: {
    setAuthors: (state, action) => action.payload,
    addAuthor: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAuthors, addAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
