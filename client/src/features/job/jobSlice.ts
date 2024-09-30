import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { deleteJobThunk, createJobThunk, editJobThunk } from "./jobThunk";
import { type JobState } from "../../types";

const initialState: JobState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);
export const editJob = createAsyncThunk("job/editJob", editJobThunk);
export const createJob = createAsyncThunk("job/createJob", createJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{ name: string; value: string | undefined }>,
    ) => {
      const { name, value } = action.payload;
      if (value !== undefined) {
        state[name as keyof JobState] = value as never;
      }
    },
    clearValues: (state) => {
      return {
        ...state,
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, action: PayloadAction<Partial<JobState>>) => {
      return { ...state, isEditing: true, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        toast.error(action.payload as string);
      })
      .addCase(deleteJob.fulfilled, () => {
        toast.success("Success! Job Removed!");
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
