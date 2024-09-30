import { describe, it, expect, beforeEach } from "vitest";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../localStorage";
import { User } from "../../types";

describe("localStorage utilities", () => {
  const mockUser: User = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a user to localStorage", () => {
    addUserToLocalStorage(mockUser);

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    expect(storedUser).toEqual(mockUser);
  });

  it("should remove a user from localStorage", () => {
    localStorage.setItem("user", JSON.stringify(mockUser));
    removeUserFromLocalStorage();

    const storedUser = localStorage.getItem("user");
    expect(storedUser).toBeNull();
  });

  it("should get a user from localStorage", () => {
    localStorage.setItem("user", JSON.stringify(mockUser));

    const retrievedUser = getUserFromLocalStorage();
    expect(retrievedUser).toEqual(mockUser);
  });

  it("should return null if no user is in localStorage", () => {
    const retrievedUser = getUserFromLocalStorage();
    expect(retrievedUser).toBeNull();
  });
});
