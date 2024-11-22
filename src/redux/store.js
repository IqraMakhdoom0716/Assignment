import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import coursesReducer from './slices/coursesSlice';
import authorsReducer from './slices/authorsSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',  
  storage,      
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer, 
    courses: coursesReducer,
    authors: authorsReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export default store;
