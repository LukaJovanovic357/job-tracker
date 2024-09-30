import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";
import { FiltersState, Job, Stats } from "../../types";

interface ShowStatsResponse {
  defaultStats: Stats;
  monthlyApplications: any[];
}

interface AllJobsState extends FiltersState {
  isLoading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Stats;
  monthlyApplications: any[];
}

const initialFiltersState: FiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: AllJobsState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<any, void, { rejectValue: string }>(
  "allJobs/getJobs",
  getAllJobsThunk,
);
export const showStats = createAsyncThunk<
  ShowStatsResponse,
  void,
  { rejectValue: string }
>("allJobs/showStats", showStatsThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (
      state,
      action: PayloadAction<{ name: keyof FiltersState; value: any }>,
    ) => {
      state.page = 1;
      state[action.payload.name] = action.payload.value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications || [];
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
