import { describe, it, expect, vi } from "vitest";
import authHeader from "../authHeader";

describe("authHeader", () => {
  it("should return the correct authorization header when a token is present", () => {
    const mockThunkAPI = {
      getState: vi.fn(() => ({
        user: {
          user: {
            token: "mockToken",
          },
        },
      })),
    };

    const result = authHeader(mockThunkAPI as any);

    expect(result).toEqual({
      headers: {
        authorization: "Bearer mockToken",
      },
    });
    expect(mockThunkAPI.getState).toHaveBeenCalledTimes(1);
  });

  it("should return an empty authorization header when no token is present", () => {
    const mockThunkAPI = {
      getState: vi.fn(() => ({
        user: {
          user: null,
        },
      })),
    };

    const result = authHeader(mockThunkAPI as any);

    expect(result).toEqual({
      headers: {
        authorization: "Bearer undefined",
      },
    });
    expect(mockThunkAPI.getState).toHaveBeenCalledTimes(1);
  });
});
