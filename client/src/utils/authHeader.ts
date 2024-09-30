import { RootState, AppDispatch } from "../store";

interface ThunkAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
}

const authHeader = (thunkAPI: ThunkAPI) => {
  const token = thunkAPI.getState().user.user?.token;
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export default authHeader;
