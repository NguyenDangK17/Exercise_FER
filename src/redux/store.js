import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './action';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});
