import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: [],
  reducers: {
    setCourses: (state, action) => action.payload,
    addCourse: (state, action) => {
      state.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCourse: (state, action) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
