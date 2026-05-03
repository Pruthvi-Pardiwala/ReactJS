import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ── Thunk: fetch() ────────────────────────────────────────────────────────────
export const callWithFetch = createAsyncThunk(
  "api/callWithFetch",
  async ({ url, method, body }, { rejectWithValue }) => {
    const start = performance.now();
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(method === "POST" && body ? { body: JSON.stringify(body) } : {}),
      };
      const res = await fetch(url, options);
      const data = await res.json();
      const duration = Math.round(performance.now() - start);
      return { data, status: res.status, duration, lib: "fetch" };
    } catch (err) {
      return rejectWithValue({ message: err.message, lib: "fetch" });
    }
  }
);

// ── Thunk: axios ──────────────────────────────────────────────────────────────
export const callWithAxios = createAsyncThunk(
  "api/callWithAxios",
  async ({ url, method, body }, { rejectWithValue }) => {
    const start = performance.now();
    try {
      const config = {
        method,
        url,
        headers: { "Content-Type": "application/json" },
        ...(method === "POST" && body ? { data: body } : {}),
      };
      const res = await axios(config);
      const duration = Math.round(performance.now() - start);
      return { data: res.data, status: res.status, duration, lib: "axios" };
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        status: err.response?.status,
        lib: "axios",
      });
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────
const initialState = {
  fetchResult: { loading: false, data: null, error: null, status: null, duration: null },
  axiosResult: { loading: false, data: null, error: null, status: null, duration: null },
  lastRequest: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setLastRequest(state, action) {
      state.lastRequest = action.payload;
    },
    clearResults(state) {
      state.fetchResult = initialState.fetchResult;
      state.axiosResult = initialState.axiosResult;
      state.lastRequest = null;
    },
  },
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(callWithFetch.pending, (state) => {
        state.fetchResult = { loading: true, data: null, error: null, status: null, duration: null };
      })
      .addCase(callWithFetch.fulfilled, (state, { payload }) => {
        state.fetchResult = { loading: false, data: payload.data, error: null, status: payload.status, duration: payload.duration };
      })
      .addCase(callWithFetch.rejected, (state, { payload }) => {
        state.fetchResult = { loading: false, data: null, error: payload?.message || "Unknown error", status: payload?.status || null, duration: null };
      });

    // axios
    builder
      .addCase(callWithAxios.pending, (state) => {
        state.axiosResult = { loading: true, data: null, error: null, status: null, duration: null };
      })
      .addCase(callWithAxios.fulfilled, (state, { payload }) => {
        state.axiosResult = { loading: false, data: payload.data, error: null, status: payload.status, duration: payload.duration };
      })
      .addCase(callWithAxios.rejected, (state, { payload }) => {
        state.axiosResult = { loading: false, data: null, error: payload?.message || "Unknown error", status: payload?.status || null, duration: null };
      });
  },
});

export const { setLastRequest, clearResults } = apiSlice.actions;
export default apiSlice.reducer;
