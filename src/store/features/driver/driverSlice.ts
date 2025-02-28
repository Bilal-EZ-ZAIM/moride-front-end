import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;
const api: string = `${apiUrl}/driver/`;
const token = localStorage.getItem("token");

interface DriverState {
  isLoading: boolean;
  profileDriver: any | null;
  errors: string | null;
  drivers: [];
  counter: number;
  DriverDetails: any;
}

// Initial state
const initialState: DriverState = {
  isLoading: false,
  profileDriver: null,
  errors: null,
  drivers: [],
  counter: 0,
  DriverDetails: null,
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

export const getDriverById = createAsyncThunk(
  "driver/getDriverById ",
  async (id: string, thunkAPI: any) => {
    try {
      const res = await axios.get(`${api}getDirver/${id}`, {
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

export const getAllDrivers = createAsyncThunk(
  "driver/getAllDrivers",
  async (_, thunkAPI: any) => {
    try {
      const res = await axios.get(`${api}`, {
        headers: {
          "Content-Type": "application/json",
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
        console.log();
        state.errors = null;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      });

    // Handle get driver with id
    builder
      .addCase(getDriverById.pending, (state) => {
        state.errors = null;
        state.isLoading = true;
      })
      .addCase(getDriverById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.DriverDetails = action.payload;
        console.log(action.payload);
        state.errors = null;
      })
      .addCase(getDriverById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action.payload;
      });

    // Handle get all drivers
    builder
      .addCase(getAllDrivers.pending, (state) => {
        state.errors = null;
        state.isLoading = true;
      })
      .addCase(getAllDrivers.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.drivers = action.payload;
        console.log(action.payload);
        state.errors = null;
      })
      .addCase(getAllDrivers.rejected, (state, action: any) => {
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
