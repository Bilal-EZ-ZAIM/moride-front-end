import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { ProfielIntrface } from "../../../interface/profileInterface";

const apiUrl: string = import.meta.env.VITE_API_URL;
const api: string = `${apiUrl}/profile/`;

const token = localStorage.getItem("token");

console.log(token);

interface AuthState {
  id: string;
  isLoading: boolean;
  profile: any | null;
  erros: string | null;
  counter: number;
  errorPhone: string;
}

// Initial state
const initialState: AuthState = {
  id: "",
  isLoading: false,
  profile: null,
  erros: null,
  counter: 0,
  errorPhone: "",
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI: any) => {
    const token = localStorage.getItem("token");
    console.log("================");
    console.log(token);
    console.log("================");
    try {
      const res = await axios.get(`${api}get/me/`, {
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

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (createProfile: ProfielIntrface, thunkAPI: any) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${api}create`, createProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);
      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);

      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "profile/uploadImage",
  async (data: any, thunkAPI: any) => {
    const endPoint =
      data.stape === "profile" ? "uploadProfileImage" : "uploadBannerImage";
    try {
      const res = await axios.post(`${api}${endPoint}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);

      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updateData: { updateData: ProfielIntrface }, thunkAPI: any) => {
    console.log(updateData);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(`${api}update/`, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.erros = null;
        state.profile = null;
      })
      .addCase(getProfile.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.id = action.payload._id;
        state.erros = null;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.profile = null;
        state.erros = action.payload.response.data.message;
      });

    // createProfile
    builder
      .addCase(createProfile.pending, (state) => {
        state.erros = null;
        state.profile = null;
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action: any) => {
        state.isLoading = false;
        // state.counter += 1;
        state.profile = action.payload.profile;
        console.log(action.payload);
        state.erros = null;
      })
      .addCase(createProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.profile = null;
        console.log(action.payload);
        state.errorPhone = action.payload.message;
      });

    // uploadImage
    builder
      .addCase(uploadImage.pending, (state) => {
        state.erros = null;
        state.profile = null;
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.counter += 1;
      })
      .addCase(uploadImage.rejected, (state, action: any) => {
        state.isLoading = false;
        state.profile = null;
        state.erros = action.payload.response.data.message;
      });

    // updateProfile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.erros = null;
        state.profile = null;
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.counter += 1;
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.profile = null;
        state.erros = action.payload.response.data.message;
      });
  },
});

export default profileSlice.reducer;
