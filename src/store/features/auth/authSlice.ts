import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosResponse } from "axios";
import { LoginIntrface } from "../../../interface/loginInterface";
import { RegisterIntrface } from "../../../interface/registerInterface";
const apiUrl: string = import.meta.env.VITE_API_URL;
const api: string = `${apiUrl}/auth/`;

interface AuthState {
  isLoading: boolean;
  user: any | null;
  error: string | null;
  erros: string | null;
  token: string | null;
  status: boolean;
  isLogin: boolean;
  messageForgetPassword: string | null;
  errorLogin: string | null;
  errorRegister: string | null;
  message: string | null;
  msgErrUpPwd: string | null;
  step: string | null;
  coun: number;
}

// Initial state
const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
  erros: null,
  token: null,
  status: false,
  isLogin: false,
  messageForgetPassword: null,
  message: null,
  errorLogin: null,
  errorRegister: null,
  msgErrUpPwd: null,
  step: "email",
  coun: 1,
};

// Create async thunk for registering a user
export const registers = createAsyncThunk(
  "auth/register",
  async (data: RegisterIntrface, thunkAPI) => {
    try {
      const res: AxiosResponse = await axios.post(api + "register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while registering:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginIntrface, thunkAPI) => {
    try {
      const res: AxiosResponse = await axios.post(`${api}login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while registering:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, thunkAPI: any) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${api}verify/code`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying OTP:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data: any, thunkAPI) => {
    try {
      const res = await axios.post(`${api}send`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying OTP:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data: any, thunkAPI: any) => {
    const updatePass = {
      password: data.currentPassword,
      newpassword: data.newPassword,
    };

    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(`${api}restPassword`, updatePass, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("Error message:", error.message);
      console.error("Error details:", error.response?.data);
      return thunkAPI.rejectWithValue({
        message: error.message,
        response: error.response?.data,
      });
    }
  }
);

export const isLogins = createAsyncThunk(
  "auth/isLogins",
  async (_, thunkAPI: any) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${api}islogin/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying login:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Pass specific error message
    }
  }
);

export const loginByGoogle = createAsyncThunk(
  "auth/loginByGoogle",
  async (_, thunkAPI: any) => {
    try {
      const res = await axios.get(`${api}google/login/`, {
        headers: {
          withCredentials: true,
          "Content-Type": "application/json",
        },
      });

      console.log("Response from API:", res.data);

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying login:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = false;
      })
      .addCase(registers.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.errorRegister = null;
        state.user = action.payload;
        state.isLogin = true;
        state.token = action.payload.token;
        state.errorRegister = null;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registers.rejected, (state, action: any) => {
        console.log(action.payload.response.data.message);

        state.isLoading = false;
        state.errorRegister = action.payload.response.data.message;
        state.status = false;
      });

    // login user
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.status = false;
        state.error = null;
        state.isLogin = false;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
        state.isLogin = true;
        state.status = true;
        localStorage.setItem("token", action.payload.token);
        console.log(state.token);
        state.coun += 1;
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log(action.payload.response.data.message);
        state.isLoading = false;
        state.errorLogin = action.payload.response.data.message;
        state.status = false;
        console.log(action.payload);
      });

    // resetPassword
    builder
      .addCase(resetPassword.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        console.log(state.token);
        state.status = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        // state.step = "Password";
        state.error = null;
        console.log(state.token);
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.response.data.errors;
        state.status = false;
      });

    // Forget Password
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.status = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        console.log("User Action", action);
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.step = "code";
        state.error = null;
        state.status = true;
      })
      .addCase(forgetPassword.rejected, (state, action: any) => {
        state.status = false;
        state.isLoading = false;
        console.log(action.payload.response.data.message);
        state.msgErrUpPwd = action.payload.response.data.message;

        state.messageForgetPassword = action.payload.response.data.message;
      });

    // UpdatePassword
    builder
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = false;
      })
      .addCase(updatePassword.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
        state.isLogin = true;
        state.status = true;
        localStorage.setItem("token", action.payload);
      })
      .addCase(updatePassword.rejected, (state, action: any) => {
        state.status = false;
        state.isLoading = false;
        console.log(action.payload);
        state.msgErrUpPwd = action.payload.response.message;
      });

    builder
      .addCase(isLogins.pending, (state) => {
        state.error = null;
      })
      .addCase(isLogins.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = true;
        state.error = null;
      })
      .addCase(isLogins.rejected, (state, action: any) => {
        state.isLoading = false;
        console.log(action.payload.response);

        state.error = action.payload.response.data.message;
      });

    builder
      .addCase(loginByGoogle.pending, (state) => {
        state.error = null;
      })
      .addCase(loginByGoogle.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = true;
        state.error = null;
      })
      .addCase(loginByGoogle.rejected, (state, action: any) => {
        state.isLoading = false;
        console.log(action.payload.response);

        state.error = action.payload.response.data.message;
      });
  },
});

export default authSlice.reducer;
