import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL;
const api: string = `${apiUrl}/pricing/`;
const token = localStorage.getItem("token");

interface PricingState {
  isLoading: boolean;
  pricingData: any;
  driverPricingDetails: any;
  error: string | null;
}

const initialState: PricingState = {
  isLoading: false,
  pricingData: null,
  driverPricingDetails: null,
  error: null,
};

export const createPricing = createAsyncThunk(
  "pricing/create",
  async (data: any, thunkAPI) => {
    const formattedData = {
      hourlyRate: parseFloat(data.hourlyRate),
      kmRate: parseFloat(data.kmRate),
      minimumFare: parseFloat(data.minimumFare),
    };

    try {
      const res = await axios.post(api, formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchPricing = createAsyncThunk(
  "pricing/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updatePricing = createAsyncThunk(
  "pricing/update",
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    console.log(id);
    try {
      const res = await axios.patch(`${api}${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deletePricing = createAsyncThunk(
  "pricing/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${api}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchDriverPricingDetails = createAsyncThunk(
  "pricing/fetchDriverPricingDetails",
  async (driverId: string, thunkAPI) => {
    try {
      const res = await axios.get(`${api}driver/${driverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const PricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPricing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pricingData = action.payload;
      })
      .addCase(createPricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })

      .addCase(fetchPricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPricing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pricingData = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchPricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePricing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pricingData = action.payload;
      })
      .addCase(updatePricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })

      .addCase(deletePricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePricing.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming you might want to filter out the deleted pricing
        state.pricingData = state.pricingData.filter(
          (item: any) => item.id !== action.payload
        );
      })
      .addCase(deletePricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDriverPricingDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDriverPricingDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.driverPricingDetails = action.payload;
      })
      .addCase(fetchDriverPricingDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default PricingSlice.reducer;
