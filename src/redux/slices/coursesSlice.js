import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addCourseAsync = createAsyncThunk(
  'courses/addCourseAsync',
  async (course) => {
    const response = await fetch('http://localhost:3000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(addCourseAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
