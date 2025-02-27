import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api: string = "http://localhost:3000/api/v1/working-hours/";
const token = localStorage.getItem("token");
interface WorkingState {
  isLoading: boolean;
  workingHours: any[];
  profileDriver: any | null;
  selectedWorkingHour: any | null;
  errors: any;
  working: any;
  viewerWorkingDetails: any;
  id: string;
  DriverWorkingState: boolean;
  isLoadingFetch: boolean;
}

// Initial state
const initialState: WorkingState = {
  id: "",
  DriverWorkingState: false,
  isLoading: false,
  workingHours: [],
  profileDriver: null,
  selectedWorkingHour: null,
  viewerWorkingDetails: null,
  errors: null,
  working: {
    monday: { start: "08:00", end: "18:00", active: false },
    tuesday: { start: "08:00", end: "18:00", active: false },
    wednesday: { start: "08:00", end: "18:00", active: false },
    thursday: { start: "08:00", end: "18:00", active: false },
    friday: { start: "08:00", end: "20:00", active: false },
    saturday: { start: "09:00", end: "16:00", active: false },
    sunday: { start: "09:00", end: "14:00", active: false },
  },
  isLoadingFetch: true,
};

export const createWorkingHours = createAsyncThunk(
  "working/create",
  async (data: any, thunkAPI) => {
    const token = localStorage.getItem("token");
    console.log(data);
    try {
      const res = await axios.post(api, data, {
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

export const fetchAllWorkingHours = createAsyncThunk(
  "working/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(api);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchDriverWorkingHours = createAsyncThunk(
  "working/fetchByDriver",

  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    console.log("=====================");
    console.log(token);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/working-hours/driver`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getDriverWorkSchedule = createAsyncThunk(
  "working/getDriverWorkSchedule",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(`${api}driver/work-schedule/${id}`);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateWorkingHours = createAsyncThunk(
  "working/update",
  async (data: any, thunkAPI) => {
    console.log(data);
    const state = thunkAPI.getState() as { working: WorkingState };
    const id = state.working.id;

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/working-hours/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteWorkingHours = createAsyncThunk(
  "working/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${api}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const WorkingSlice = createSlice({
  name: "working",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkingHours.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(createWorkingHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workingHours.push(action.payload);
      })
      .addCase(createWorkingHours.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      .addCase(fetchAllWorkingHours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllWorkingHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workingHours = action.payload;
      })
      .addCase(fetchAllWorkingHours.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      .addCase(fetchDriverWorkingHours.pending, (state) => {
        state.isLoading = true;
        state.isLoadingFetch = true;
      })
      .addCase(fetchDriverWorkingHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileDriver = action.payload;
        state.working = action.payload.data.weekSchedule;
        state.id = action.payload.data._id;
        state.DriverWorkingState = true;
        state.isLoadingFetch = false;
      })
      .addCase(fetchDriverWorkingHours.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        console.log(action.payload);
        state.isLoadingFetch = false;
      })

      .addCase(getDriverWorkSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriverWorkSchedule.fulfilled, (state, action) => {
        state.viewerWorkingDetails = action.payload.data.weekSchedule;
        state.isLoading = false;
      })
      .addCase(getDriverWorkSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      .addCase(updateWorkingHours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkingHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workingHours = state.workingHours.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateWorkingHours.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        console.log(action.payload);
      })

      .addCase(deleteWorkingHours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkingHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workingHours = state.workingHours.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteWorkingHours.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export default WorkingSlice.reducer;
