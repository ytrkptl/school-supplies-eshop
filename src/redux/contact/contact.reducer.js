import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isFetching: false,
  data: null,
  errorMessage: undefined,
  hasErrored: null
};

export const sendContactForm = createAsyncThunk(
  'contact/sendContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message || 'Something went wrong');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

const contactFormSlice = createSlice({
  name: 'contact',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.isFetching = true;
        state.hasErrored = null;
        state.errorMessage = undefined;
      })
      .addCase(sendContactForm.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isFetching = false;
        state.hasErrored = false;
        state.errorMessage = undefined;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isFetching = false;
        state.hasErrored = true;
      });
  }
});

export default contactFormSlice.reducer;