import { describe, it, expect, vi } from "vitest";
import jobReducer, { handleChange, setEditJob } from "../jobSlice";
import { JobState } from "../../../types";

// Mock dependencies
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../utils/axios", () => ({
  delete: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
}));

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

describe("jobSlice", () => {
  it("should return the initial state", () => {
    expect(jobReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle handleChange action", () => {
    const newState = jobReducer(
      initialState,
      handleChange({ name: "position", value: "Developer" }),
    );
    expect(newState.position).toBe("Developer");
  });

  it("should handle setEditJob action", () => {
    const editJobData = {
      position: "New Position",
      company: "New Company",
    };
    const newState = jobReducer(initialState, setEditJob(editJobData));
    expect(newState).toEqual({
      ...initialState,
      isEditing: true,
      ...editJobData,
    });
  });
});
