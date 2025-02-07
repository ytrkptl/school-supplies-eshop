import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addItemToBag, removeItemFromBag } from './bag.utils';
import { BAG_TYPES } from './bag.types';
import { 
  doc, 
  setDoc, 
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { firestore } from '@/utils/firebase/firebase.utils';

const initialState = {
  hidden: true,
  localBag: [],
  onlineBag: [],
  activeBag: BAG_TYPES.LOCAL,
  error: null,
  loading: false,
  mergePromptShown: false
};

// Async thunks
export const fetchOnlineBag = createAsyncThunk(
  'bag/fetchOnlineBag',
  async (userId, { rejectWithValue }) => {
    try {
      const bagRef = doc(firestore, 'bags', userId);
      const bagDoc = await getDoc(bagRef);
      return bagDoc.exists() ? bagDoc.data().items : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOnlineBag = createAsyncThunk(
  'bag/updateOnlineBag',
  async ({ userId, bagItems }, { rejectWithValue }) => {
    if (!userId) return bagItems;
    try {
      const bagRef = doc(firestore, 'bags', userId);
      await setDoc(bagRef, { items: bagItems }, { merge: true });
      return bagItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const mergeBagsToOnline = createAsyncThunk(
  'bag/mergeBagsToOnline',
  async ({ userId, localBag, onlineBag }, { rejectWithValue }) => {
    try {
      const mergedItems = [...onlineBag];
      localBag.forEach(localItem => {
        const existingItem = mergedItems.find(item => item.id === localItem.id);
        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          mergedItems.push(localItem);
        }
      });

      const bagRef = doc(firestore, 'bags', userId);
      await setDoc(bagRef, { items: mergedItems }, { merge: true });
      return mergedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    toggleBagHidden(state) {
      state.hidden = !state.hidden;
    },
    addItem(state, action) {
      const { item, bagType = state.activeBag } = action.payload;
      if (bagType === BAG_TYPES.LOCAL) {
        state.localBag = addItemToBag(state.localBag, item);
      } else {
        state.onlineBag = addItemToBag(state.onlineBag, item);
      }
    },
    removeItem(state, action) {
      const { item, bagType = state.activeBag } = action.payload;
      if (bagType === BAG_TYPES.LOCAL) {
        state.localBag = removeItemFromBag(state.localBag, item);
      } else {
        state.onlineBag = removeItemFromBag(state.onlineBag, item);
      }
    },
    clearItemFromBag(state, action) {
      const { item, bagType = state.activeBag } = action.payload;
      if (bagType === BAG_TYPES.LOCAL) {
        state.localBag = state.localBag.filter(
          bagItem => bagItem.id !== item.id
        );
      } else {
        state.onlineBag = state.onlineBag.filter(
          bagItem => bagItem.id !== item.id
        );
      }
    },
    clearBagFromFirestore(state, action) {
      const { userId } = action.payload;
      if (userId) {
        deleteDoc(doc(firestore, 'bags', userId));
      }
    },
    clearBag(state, action) {
      const { bagType = state.activeBag } = action.payload;
      if (bagType === BAG_TYPES.LOCAL) {
        state.localBag = [];
      } else {
        state.onlineBag = [];
      }
    },
    setActiveBag(state, action) {
      state.activeBag = action.payload;
    },
    setMergePromptShown(state, action) {
      state.mergePromptShown = action.payload;
    },
    clearLocalBag(state) {
      state.localBag = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOnlineBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnlineBag.fulfilled, (state, action) => {
        state.loading = false;
        state.onlineBag = action.payload;
        state.error = null;
      })
      .addCase(fetchOnlineBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOnlineBag.fulfilled, (state, action) => {
        state.onlineBag = action.payload;
        state.error = null;
      })
      .addCase(updateOnlineBag.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(mergeBagsToOnline.fulfilled, (state, action) => {
        state.onlineBag = action.payload;
        state.localBag = [];
        state.mergePromptShown = false;
        state.error = null;
      })
      .addCase(mergeBagsToOnline.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const {
  toggleBagHidden,
  addItem,
  removeItem,
  clearItemFromBag,
  clearBagFromFirestore,
  clearBag,
  setActiveBag,
  setMergePromptShown,
  clearLocalBag
} = bagSlice.actions;

export default bagSlice.reducer;