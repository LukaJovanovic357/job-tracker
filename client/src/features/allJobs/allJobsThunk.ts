import { ShowStatsResponse } from "../../types";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_: any, thunkAPI: any) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (
  _: void,
  thunkAPI: any,
): Promise<ShowStatsResponse> => {
  try {
    const res = await customFetch.get("/jobs/stats");
    return res.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
