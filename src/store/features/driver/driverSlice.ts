import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api: string = "http://localhost:3000/api/v1/driver/";
const token = localStorage.getItem("token");

interface DriverState {
  isLoading: boolean;
  profileDriver: any | null;
  errors: string | null;
  counter: number;
}

// Initial state
const initialState: DriverState = {
  isLoading: false,
  profileDriver: null,
  errors: null,
  counter: 0,
};

// Thunks
export const getProfile = createAsyncThunk(
  "driver/getProfile",
  async (_, thunkAPI: any) => {
    try {
      const res = await axios.get(`${api}getDriver`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      return res.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const changeRoleTodriver = createAsyncThunk(
  "driver/changeRoleTodriver",
  async (_, thunkAPI: any) => {
    try {
      const res = await axios.get(`${api}change/to/driver`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const createDriverProfile = createAsyncThunk(
  "driver/createProfile",
  async (createProfile: any, thunkAPI: any) => {
    try {
      const res = await axios.post(`${api}create`, createProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// Create the slice
const DriverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getProfile
    builder
      .addCase(getProfile.pending, (state) => {
        state.errors = null;
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.profileDriver = action.payload;
        console.log("sdkbqvicd ")
        state.errors = null;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      });

    // Handle changeRoleTodriver
    builder
      .addCase(changeRoleTodriver.pending, (state) => {
        state.errors = null;
        state.isLoading = true;
      })
      .addCase(changeRoleTodriver.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(changeRoleTodriver.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      });

    // Handle createDriverProfile
    builder
      .addCase(createDriverProfile.pending, (state) => {
        state.errors = null;
        state.isLoading = true;
      })
      .addCase(createDriverProfile.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.errors = null;
        state.profileDriver = action.payload;
      })
      .addCase(createDriverProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export default DriverSlice.reducer;
