import { configureStore } from '@reduxjs/toolkit';
import manageFormReducer from './manage-form/manage-form-reducer';

export const store = configureStore({
  reducer: {
    form: manageFormReducer,
  },
});
