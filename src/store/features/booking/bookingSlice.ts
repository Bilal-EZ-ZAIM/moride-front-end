import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/booking/`;
const token = localStorage.getItem("token");
interface BookingState {
  bookings: any;
  myBookings: any;
  loading: boolean;
  error: string | null;
  booking: any;
  counter: number;
}

const initialState: BookingState = {
  bookings: [],
  myBookings: [],
  loading: false,
  error: null,
  booking: null,
  counter: 1,
};

export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching bookings");
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (id: any, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching bookings");
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  "booking/fetchMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}my-booking`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching my bookings"
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}`, bookingData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error creating booking");
    }
  }
);

export const postule = createAsyncThunk(
  "booking/postule",
  async ({ id, data }: any, thunkAPI) => {
    console.log(id)
    try {
      const res = await axios.patch(`${API_URL}${id}/apply`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const acceptOffer = createAsyncThunk(
  "booking/acceptOffer",
  async (
    { id, driverId }: { id: string; driverId: any },
    { rejectWithValue }
  ) => {
    console.log(driverId);
    try {
      const response = await axios.patch(
        `${API_URL}${id}/accepter`,
        { driverId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error accepting offer"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.bookings = action.payload;

        console.log(action.payload);
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.booking = action.payload;

        console.log(action.payload);
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.myBookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(postule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postule.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
      })
      .addCase(postule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })

      .addCase(acceptOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptOffer.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.counter += 1;
      })
      .addCase(acceptOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      });
  },
});

export default bookingSlice.reducer;
