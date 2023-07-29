import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const reducer = combineReducers({ User: userReducer });

export const store = configureStore({ reducer });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
