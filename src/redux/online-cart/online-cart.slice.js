import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  doc, 
  setDoc, 
  getDoc,
} from 'firebase/firestore';
import { firestore } from '@/utils/firebase/firebase.utils';

// Async thunks
export const syncWithFirebase = createAsyncThunk(
  'onlineCart/syncWithFirebase',
  async ({ userId, bagItems }, { rejectWithValue }) => {
    try {
      console.log('Syncing bag to Firebase:', { userId, items: bagItems });
      const cartRef = doc(firestore, `users/${userId}/cart/items`);
      await setDoc(cartRef, { items: bagItems });
      return bagItems;
    } catch (error) {
      console.error('Error syncing to Firebase:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  'onlineCart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('Fetching cart from Firebase for user:', userId);
      const cartRef = doc(firestore, `users/${userId}/cart/items`);
      const cartSnap = await getDoc(cartRef);
      const items = cartSnap.exists() ? cartSnap.data().items : [];
      console.log('Fetched items:', items);
      return items;
    } catch (error) {
      console.error('Error fetching from Firebase:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  lastSynced: null
};

const onlineCartSlice = createSlice({
  name: 'onlineCart',
  initialState,
  reducers: {
    clearOnlineCart: (state) => {
      state.items = [];
      state.lastSynced = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncWithFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncWithFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastSynced = new Date().toISOString();
      })
      .addCase(syncWithFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOnlineCart } = onlineCartSlice.actions;
export default onlineCartSlice.reducer;