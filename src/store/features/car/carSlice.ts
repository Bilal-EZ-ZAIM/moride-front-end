import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CarState {
  car: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: CarState = {
  car: null,
  isLoading: false,
  error: null,
};

const api = "http://localhost:3000/api/v1/car/";

// Create car thunk
export const createCar = createAsyncThunk(
  "car/create",
  async (carData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/car/create",
        carData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Get all cars thunk
export const getAllCars = createAsyncThunk("car/getAll", async () => {
  const response = await axios.get(`${api}all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

export const getMyCar = createAsyncThunk("car/getMyCar", async () => {
  const response = await axios.get(`${api}get/mycar`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

// Get single car thunk
export const getCarById = createAsyncThunk(
  "car/getOne",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update car thunk
export const updateCar = createAsyncThunk(
  "car/update",
  async (
    { id, updateData }: { id: string; updateData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${api}update/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete car thunk
export const deleteCar = createAsyncThunk(
  "car/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${api}delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return { id, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create car
    builder
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get all cars
      .addCase(getAllCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get my car
      .addCase(getMyCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyCar.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.car)
        state.car = action.payload.car;
        
      })
      .addCase(getMyCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get single car
      .addCase(getCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update car
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete car
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default carSlice.reducer;
