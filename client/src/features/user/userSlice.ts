import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserRegister, UserUpdateInfo } from '../../types';
import { User, UserLogin, LoginResponse } from '../../types';

import {
    registerUserThunk,
    loginUserThunk,
    updateUserThunk,
    clearStoreThunk
} from './userThunk';
import {
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    addUserToLocalStorage
} from '../../utils/localStorage';

interface UserState {
    isLoading: boolean;
    isSidebarOpen: boolean;
    user: User | null;
}

const initialState: UserState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage() || null
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: UserRegister, thunkAPI: any) => {
        return registerUserThunk('/auth/register', user, thunkAPI);
    }
);

export const loginUser = createAsyncThunk<
    LoginResponse,
    UserLogin,
    { rejectValue: string }
>('auth/loginUser', async (user: UserLogin, thunkAPI: any) => {
    return loginUserThunk('auth/login', user, thunkAPI);
});

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user: UserUpdateInfo, thunkAPI: any) => {
        return updateUserThunk('auth/updateUser', user, thunkAPI);
    }
);

export const clearStore = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>('user/clearStore', async (message, thunkAPI: any) => {
    return clearStoreThunk(message, thunkAPI);
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state, { payload }: PayloadAction<string | undefined>) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            if (payload) {
                toast.success(payload);
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const { user } = payload;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload as string);
            })
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const { user } = payload;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome Back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload as string);
            })
            .addCase(updateUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const { user } = payload;
                addUserToLocalStorage(user);
                toast.success(`User Updated!`);
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload as string);
            })
            .addCase(clearStore.rejected, () => {
                toast.error('There was an error...');
            });
    }
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
