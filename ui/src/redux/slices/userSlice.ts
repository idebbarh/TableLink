import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import apiEndpoints from "../../api/apiEndpoints";
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
type MyKnownError = { errorMessage: string };

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
    const res = await axios.post(
      "http://localhost:4000" + apiEndpoints.auth.login,
      data
    );

    return res.data.res;
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
    const res = await axios.post(
      "http://localhost:4000" + apiEndpoints.auth.signup,
      data
    );

    return res.data.res;
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
      })
      .addCase(logout, () => {
        removeDataFromLocalStorage(["user", "token"]);
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
