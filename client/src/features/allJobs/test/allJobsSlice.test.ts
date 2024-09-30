import { AllJobsState } from "./../../../types";
import { describe, it, expect } from "vitest";
import allJobsReducer, {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} from "../allJobsSlice";

const initialState: AllJobsState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

describe("allJobsSlice", () => {
  it("should handle initial state", () => {
    expect(allJobsReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("should handle showLoading", () => {
    const actual = allJobsReducer(initialState, showLoading());
    expect(actual.isLoading).toEqual(true);
  });

  it("should handle hideLoading", () => {
    const actual = allJobsReducer(initialState, hideLoading());
    expect(actual.isLoading).toEqual(false);
  });

  it("should handle handleChange", () => {
    const actual = allJobsReducer(
      initialState,
      handleChange({ name: "search", value: "developer" }),
    );
    expect(actual.search).toEqual("developer");
    expect(actual.page).toEqual(1);
  });

  it("should handle clearFilters", () => {
    const modifiedState = {
      ...initialState,
      search: "developer",
      searchStatus: "active",
    };
    const actual = allJobsReducer(modifiedState, clearFilters());
    expect(actual.search).toEqual("");
    expect(actual.searchStatus).toEqual("all");
  });

  it("should handle changePage", () => {
    const actual = allJobsReducer(initialState, changePage(3));
    expect(actual.page).toEqual(3);
  });

  it("should handle clearAllJobsState", () => {
    const modifiedState = {
      ...initialState,
      search: "developer",
    };
    const actual = allJobsReducer(modifiedState, clearAllJobsState());
    expect(actual).toEqual(initialState);
  });
});
