import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from '../types/Sx';

export interface UserState {
  status: 'idle' | 'loading' | 'failed';
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: UserState = {
  status: 'idle',
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserPayload: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUserPayload } = userSlice.actions;

export const currentUser = (state: RootState) => state.User;

export default userSlice.reducer;
