import { configureStore } from "@reduxjs/toolkit";
import { vi, describe, it, expect, beforeEach } from "vitest";

import userReducer, {
  toggleSidebar,
  logoutUser,
  loginUser,
  updateUser,
  clearStore,
} from "../userSlice";
import { loginUserThunk, updateUserThunk, clearStoreThunk } from "../userThunk";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../../utils/localStorage";
import { toast } from "react-toastify";

// Mock the dependencies
vi.mock("../userThunk", () => ({
  registerUserThunk: vi.fn(),
  loginUserThunk: vi.fn(),
  updateUserThunk: vi.fn(),
  clearStoreThunk: vi.fn(),
}));

vi.mock("../../../utils/localStorage", () => ({
  getUserFromLocalStorage: vi.fn(),
  addUserToLocalStorage: vi.fn(),
  removeUserFromLocalStorage: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("userSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  it("should toggle sidebar", () => {
    store.dispatch(toggleSidebar());
    //@ts-ignore
    const state = store.getState().user;
    expect(state.isSidebarOpen).toBe(true);

    store.dispatch(toggleSidebar());
    //@ts-ignore
    const updatedState = store.getState().user;
    expect(updatedState.isSidebarOpen).toBe(false);
  });

  it("should handle logoutUser", () => {
    store.dispatch(logoutUser("Logged out successfully"));
    //@ts-ignore
    const state = store.getState().user;
    expect(state.user).toBeNull();
    expect(state.isSidebarOpen).toBe(false);
    expect(removeUserFromLocalStorage).toHaveBeenCalled();
  });

  it.skip("should handle loginUserThunk", async () => {
    const user = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    };
    //@ts-ignore
    (loginUserThunk as vi.Mock).mockResolvedValue({ user });

    await store.dispatch(
      //@ts-ignore
      loginUser({
        email: "john.doe@example.com",
        password: "password",
      }),
    );
    //@ts-ignore
    const state = store.getState().user;
    expect(state.user).toEqual(user);
    expect(addUserToLocalStorage).toHaveBeenCalledWith(user);
    expect(toast.success).toHaveBeenCalledWith("Login Successful!");
  });

  it.skip("should handle updateUserThunk", async () => {
    const user = {
      id: "1",
      name: "Jane Doe",
      email: "jane.doe@example.com",
    };
    //@ts-ignore
    (updateUserThunk as vi.Mock).mockResolvedValue({ user });
    //@ts-ignore
    await store.dispatch(updateUser({ name: "Jane Doe" }));
    //@ts-ignore
    const state = store.getState().user;
    expect(state.user).toEqual(user);
    expect(addUserToLocalStorage).toHaveBeenCalledWith(user);
    expect(toast.success).toHaveBeenCalledWith("User Updated!");
  });

  it("should handle clearStore thunk rejection", async () => {
    const errorMessage = "Failed to clear store";
    //@ts-ignore
    (clearStoreThunk as vi.Mock).mockRejectedValue(errorMessage);
    //@ts-ignore
    await store.dispatch(clearStore("Error clearing store"));
    expect(toast.error).toHaveBeenCalledWith("There was an error...");
  });
});
