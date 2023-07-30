import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserCompanyDetails, fileUpload } from '../types/Sx';

import httpWrapper from '../config/api/axiosWrapper';

import { RootState } from './store';
import { User } from '../types/Sx';

export interface UserState {
  status: 'idle' | 'loading' | 'failed';
  isAuthenticated: boolean;
  user: User | null;
  nonAdmins: Array<User> | null;
  appFirstLoad: boolean;
}

const initialState: UserState = {
  status: 'idle',
  isAuthenticated: false,
  user: null,
  nonAdmins: null,
  appFirstLoad: true,
};

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: UserCompanyDetails): Promise<User> => {
    const user = await httpWrapper({
      method: 'put',
      url: '/users/updateUser',
      payload,
    });
    return user?.data as User;
  }
);

export const fetchNonAdmins = createAsyncThunk(
  'user/nonAdmins',
  async (): Promise<Array<User>> => {
    const users = await httpWrapper({ url: '/users' });
    return users?.data as Array<User>;
  }
);

export const uploadUserLogo = createAsyncThunk(
  'user/uploadLogo',
  async ({ uid, file: payload }: fileUpload): Promise<Array<User>> => {
    const users = await httpWrapper({
      method: 'patch',
      url: `/users/uploadLogo/${uid}`,
      payload,
    });
    return users?.data as Array<User>;
  }
);

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
    setAppFirstLoad: (state, action: PayloadAction<boolean>) => {
      state.appFirstLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchNonAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNonAdmins.fulfilled, (state, action) => {
        state.status = 'idle';
        state.nonAdmins = action.payload;
      })
      .addCase(fetchNonAdmins.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(uploadUserLogo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadUserLogo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.nonAdmins = action.payload;
      })
      .addCase(uploadUserLogo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setIsAuthenticated, setUserPayload, setAppFirstLoad } =
  userSlice.actions;

export const currentUser = (state: RootState) => state.User;

export default userSlice.reducer;
