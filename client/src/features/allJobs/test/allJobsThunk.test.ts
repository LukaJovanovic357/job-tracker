import { describe, it, expect, vi } from "vitest";
import { getAllJobsThunk } from "../allJobsThunk";
import customFetch, { checkForUnauthorizedResponse } from "utils/axios";

vi.mock("utils/axios");

describe("getAllJobsThunk", () => {
  const thunkAPI = {
    getState: vi.fn(),
    dispatch: vi.fn(),
    rejectWithValue: vi.fn(),
  };

  it("should fetch data and return it on success", async () => {
    const mockState: any = {
      allJobs: {
        page: 1,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      },
    };
    const mockResponse = { data: { jobs: [] } };
    vi.mocked(customFetch.get).mockResolvedValue(mockResponse as any);

    vi.mocked(thunkAPI.getState).mockReturnValue(mockState);

    const result = await getAllJobsThunk(null, thunkAPI as any);

    expect(result).toEqual(mockResponse.data);
    expect(customFetch.get).toHaveBeenCalledWith(
      "/jobs?status=all&jobType=all&sort=latest&page=1",
    );
  });

  it("should handle errors by calling checkForUnauthorizedResponse", async () => {
    const mockState: any = {
      allJobs: {
        page: 1,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      },
    };
    const mockError = { response: { status: 401 } };
    vi.mocked(customFetch.get).mockRejectedValue(mockError as any);

    vi.mocked(thunkAPI.getState).mockReturnValue(mockState);

    await getAllJobsThunk(null, thunkAPI as any);

    expect(checkForUnauthorizedResponse).toHaveBeenCalledWith(
      mockError,
      thunkAPI,
    );
  });
});
