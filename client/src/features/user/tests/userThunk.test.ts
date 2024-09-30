import { describe, it, expect, vi, beforeEach } from "vitest";
import customFetch from "../../../utils/axios";
import { clearAllJobsState } from "../../allJobs/allJobsSlice";
import { clearValues } from "../../job/jobSlice";
import { logoutUser } from "../userSlice";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "../userThunk";
import { checkForUnauthorizedResponse } from "../../../utils/axios";

vi.mock("../../../utils/axios", () => ({
  default: {
    post: vi.fn(),
    patch: vi.fn(),
  },
  checkForUnauthorizedResponse: vi.fn(),
}));

vi.mock("../../allJobs/allJobsSlice", () => ({
  clearAllJobsState: vi.fn(),
}));
vi.mock("../../job/jobSlice", () => ({
  clearValues: vi.fn(),
}));
vi.mock("../userSlice", () => ({
  logoutUser: vi.fn(),
}));

describe("userThunks", () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();
  const mockRejectWithValue = vi.fn();

  const thunkAPI = {
    dispatch: mockDispatch,
    getState: mockGetState,
    rejectWithValue: mockRejectWithValue,
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerUserThunk", () => {
    it("should handle successful registration", async () => {
      const mockResponse = {
        data: { user: { id: "1", name: "John Doe" } },
      };
      (customFetch.post as any).mockResolvedValue(mockResponse);

      const result = await registerUserThunk(
        "/register",
        // @ts-ignore
        { email: "john@example.com", password: "password" },
        thunkAPI,
      );
      expect(result).toEqual(mockResponse.data);
      expect(customFetch.post).toHaveBeenCalledWith("/register", {
        email: "john@example.com",
        password: "password",
      });
    });

    it.skip("should handle registration failure", async () => {
      const mockError = {
        response: { data: { msg: "Registration failed" } },
      };
      (customFetch.post as any).mockRejectedValue(mockError);

      const result = await registerUserThunk(
        "/register",
        // @ts-ignore
        { email: "john@example.com", password: "password" },
        thunkAPI,
      );
      expect(result).toBe(mockError.response.data.msg);
      expect(thunkAPI.rejectWithValue).toHaveBeenCalledWith(
        mockError.response.data.msg,
      );
    });
  });

  describe("loginUserThunk", () => {
    it("should handle successful login", async () => {
      const mockResponse = {
        data: { user: { id: "1", name: "John Doe" } },
      };
      // @ts-ignore
      (customFetch.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await loginUserThunk(
        "/login",
        { email: "john@example.com", password: "password" },
        thunkAPI,
      );
      expect(result).toEqual(mockResponse.data);
      expect(customFetch.post).toHaveBeenCalledWith("/login", {
        email: "john@example.com",
        password: "password",
      });
    });

    it.skip("should handle login failure", async () => {
      const mockError = { response: { data: { msg: "Login failed" } } };
      // @ts-ignore
      (customFetch.post as jest.Mock).mockRejectedValue(mockError);

      const result = await loginUserThunk(
        "/login",
        { email: "john@example.com", password: "password" },
        thunkAPI,
      );
      expect(result).toBe(mockError.response.data.msg);
      expect(thunkAPI.rejectWithValue).toHaveBeenCalledWith(
        mockError.response.data.msg,
      );
    });
  });

  describe("updateUserThunk", () => {
    it("should handle successful user update", async () => {
      const mockResponse = {
        data: { user: { id: "1", name: "Jane Doe" } },
      };
      // @ts-ignore
      (customFetch.patch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await updateUserThunk(
        "/update",
        // @ts-ignore
        { name: "Jane Doe" },
        thunkAPI,
      );
      expect(result).toEqual(mockResponse.data);
      expect(customFetch.patch).toHaveBeenCalledWith("/update", {
        name: "Jane Doe",
      });
    });

    it("should handle update failure due to unauthorized response", async () => {
      const mockError = {
        response: { status: 401, data: { msg: "Unauthorized" } },
      };
      // @ts-ignore
      (customFetch.patch as jest.Mock).mockRejectedValue(mockError);
      // @ts-ignore
      await updateUserThunk("/update", { name: "Jane Doe" }, thunkAPI);
      expect(checkForUnauthorizedResponse).toHaveBeenCalledWith(
        mockError,
        thunkAPI,
      );
    });
  });

  describe("clearStoreThunk", () => {
    it("should dispatch appropriate actions on clear store", async () => {
      await clearStoreThunk("Session expired", thunkAPI);
      expect(mockDispatch).toHaveBeenCalledWith(logoutUser("Session expired"));
      expect(mockDispatch).toHaveBeenCalledWith(clearAllJobsState());
      expect(mockDispatch).toHaveBeenCalledWith(clearValues());
    });
  });
});
