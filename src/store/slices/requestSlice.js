import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiServices from "../../services/ApiServices";

const initialState = {
  requests: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getRequests = createAsyncThunk(
  "/requests",
  async (params, thunkAPI) => {
    try {
      const res = await ApiServices.getRequest(params);
      return res.data.data.content;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const requests = createSlice({
  name: "requests",
  initialState,
  extraReducers: (builder) => {
    /////////Get All Requests/////////////////////
    builder
      .addCase(getRequests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = action.payload;
      })
      .addCase(getRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.requests = [];
      });
  },
});

export default requests.reducer;
