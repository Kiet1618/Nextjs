import { createAsyncThunk } from '@reduxjs/toolkit';

export const testFunc = createAsyncThunk<any, any>(
  'overview/test',
  async (_: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      return fulfillWithValue(1);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
