import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  firestore, 
  convertCollectionsSnapshotToMap 
} from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';

export const fetchCollectionsAsync = createAsyncThunk(
  'shop/fetchCollections',
  async (_, { rejectWithValue }) => {
    try {
      const collectionRef = collection(firestore, 'collections');
      const snapshot = await getDocs(collectionRef);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      return collectionsMap;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  collections: null,
  isLoading: false,
  error: null
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollectionsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
        state.error = null;
      })
      .addCase(fetchCollectionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default shopSlice.reducer;
