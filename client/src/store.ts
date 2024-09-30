import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/loginUser/fulfilled",
          "auth/registerUser/fulfilled",
        ],
        ignoredActionPaths: ["meta.arg", "payload"],
        ignoredPaths: ["user.user"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
