import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import authorsReducer from './slices/authorsSlice';
import { useReducer } from 'react';

export const store = configureStore({
  reducer: {
    user: useReducer,
    courses: coursesReducer,
    authors: authorsReducer,
  },
});
