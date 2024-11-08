import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './features/contactSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
export default store;
