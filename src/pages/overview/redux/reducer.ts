import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';
import { OverviewState } from './types';

const initialState = {
  test: {
    data: 0,
    loading: false,
    error: {},
  },
} as OverviewState;

export const overview = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.testFunc.pending, (state, action) => {
      state.test.loading = true;
    });
    builder.addCase(actions.testFunc.fulfilled, (state, action) => {
      state.test.data += action.payload;
      state.test.loading = false;
    });
    builder.addCase(actions.testFunc.rejected, (state, action) => {
      state.test.error = action.payload;
      state.test.loading = false;
    });
  },
});

// Reducers and actions
export const { test } = overview.actions;

export default overview.reducer;
