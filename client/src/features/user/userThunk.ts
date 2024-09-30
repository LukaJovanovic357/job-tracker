import customFetch from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";
import { checkForUnauthorizedResponse } from "../../utils/axios";
import { AppDispatch, RootState } from "../../store";
import {
  UserLogin,
  UserRegister,
  LoginResponse,
  UserUpdateInfo,
} from "../../types";

interface CustomThunkAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (value: unknown) => unknown;
}

export const registerUserThunk = async (
  url: string,
  user: UserRegister,
  thunkAPI: CustomThunkAPI,
) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (
  url: string,
  user: UserLogin,
  thunkAPI: any,
): Promise<LoginResponse> => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (
  url: string,
  user: UserUpdateInfo,
  thunkAPI: CustomThunkAPI,
) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (
  message: string,
  thunkAPI: CustomThunkAPI,
): Promise<void> => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
