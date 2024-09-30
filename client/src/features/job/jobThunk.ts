import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./jobSlice";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { JobInput } from "../../types";

export type ThunkAPI = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: string;
};

interface EditPayload {
  jobId: string;
  job: JobInput;
}

export const deleteJobThunk = async (jobId: string, thunkAPI: any) => {
  thunkAPI.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createJobThunk = async (job: JobInput, thunkAPI: any) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Loggin Out...");
    }
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async (
  { jobId, job }: EditPayload,
  thunkAPI: any,
) => {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
