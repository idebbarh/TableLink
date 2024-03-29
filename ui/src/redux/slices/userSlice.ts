import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import AuthApi from "../../api/auth";
import {
  addDataToLocalStorage,
  removeDataFromLocalStorage,
} from "../../utils/functions";
import { RootState } from "../store/store";

type InitialState = {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
};

const initialState: InitialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  { token: string; user: User },
  { email: string; password: string },
  {
    rejectValue: MyKnownError;
  }
>("user/login", async (data, { rejectWithValue }) => {
  try {
    const res = (await AuthApi.getUser<{ email: string; password: string }>(
      data
    )) as { res: { token: string; user: User } };
    return res.res;
  } catch (err) {
    const errValue = (err as AxiosError)?.response?.data;
    return rejectWithValue(errValue as { errorMessage: string });
  }
});

export const register = createAsyncThunk<
  { token: string; user: User },
  SubmitSignupFormData,
  {
    rejectValue: MyKnownError;
  }
>("user/register", async (data, { rejectWithValue }) => {
  try {
    const res = (await AuthApi.createUser<SubmitSignupFormData>(data)) as {
      res: { token: string; user: User };
    };
    return res.res;
  } catch (err) {
    const errValue = (err as AxiosError)?.response?.data;
    return rejectWithValue(errValue as { errorMessage: string });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeDataFromLocalStorage(["user", "token"]);
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        addDataToLocalStorage({
          user: action.payload.user,
          token: action.payload.token,
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        addDataToLocalStorage({
          user: action.payload.user,
          token: action.payload.token,
        });
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const { logout, resetError } = userSlice.actions;

export default userSlice.reducer;
