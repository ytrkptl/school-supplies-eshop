import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.utils';

const INITIAL_STATE = {
  sections: [],
  isLoading: false,
  error: null
};

// Async thunk for fetching sections from Firestore
export const fetchSections = createAsyncThunk(
  'directory/fetchSections',
  async (_, { rejectWithValue }) => {
    try {
      const collectionsRef = collection(firestore, 'collections');
      const q = query(collectionsRef, orderBy('displayOrderId', 'asc'));
      const snapshot = await getDocs(q);
      
      const sections = snapshot.docs.map(doc => {
        const { title, id, imageUrl, displayOrderId } = doc.data();
        return {
          title,
          id,
          imageUrl,
          displayOrderId,
          linkUrl: `shop/${title.toLowerCase().replace(/\s/g, '-')}`,
          size: title.length > 16 ? 'large' : ''
        };
      });

      return sections;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const directorySlice = createSlice({
  name: 'directory',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = action.payload;
        state.error = null;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectDirectory = state => state.directory.sections;
export const selectIsLoading = state => state.directory.isLoading;
export const selectError = state => state.directory.error;

export default directorySlice.reducer;