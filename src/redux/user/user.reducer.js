import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc } from 'firebase/firestore';
import { 
  auth, 
  googleProvider, 
  createUserProfileDocument,
  getCurrentUser,
  signUpWithCredentialsWrapper,
  signOutFromFirebase
} from '@/utils/firebase/firebase.utils';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { fetchCart, clearOnlineCart, syncWithFirebase } from '../online-cart/online-cart.slice';

// Helper function to get user snapshot
const getUserSnapshot = async (userAuth, additionalData) => {
  const userRef = await createUserProfileDocument(userAuth, additionalData);
  const userSnapshot = await getDoc(userRef);
  return { id: userSnapshot.id, ...userSnapshot.data() };
};

// Async thunks
export const checkUserSession = createAsyncThunk(
  'user/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) return null;
      return await getUserSnapshot(userAuth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleSignInStart = createAsyncThunk(
  'user/googleSignIn',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      
      // Create or get user profile document
      const userRef = await createUserProfileDocument(user);
      const userSnapshot = await getDoc(userRef);
      const userProfile = { id: userSnapshot.id, ...userSnapshot.data() };

      // Get the current bag items
      const { bag } = getState();
      const { localBag } = bag;

      // If there are items in the local bag, sync them first
      if (localBag.length > 0) {
        await dispatch(syncWithFirebase({ 
          userId: userProfile.id, 
          bagItems: localBag 
        })).unwrap();
        // Clear local bag after successful sync
        dispatch(clearLocalBag());
      } else {
        // Otherwise, just fetch any existing online cart
        await dispatch(fetchCart(userProfile.id));
      }
      
      return userProfile;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const emailSignInStart = createAsyncThunk(
  'user/emailSignIn',
  async ({ email, password }, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userSnapshot = await getUserSnapshot(user);
      const userProfile = {
        id: userSnapshot.id,  // This is the document ID (uid)
        ...userSnapshot.data()
      };
      // Get current bag items
      const { bag } = getState();
      const { localBag } = bag;

      // If there are items in the local bag, sync them first
      if (localBag.length > 0) {
        await dispatch(syncWithFirebase({ 
          userId: userSnapshot.id, 
          bagItems: localBag 
        })).unwrap();
        // Clear local bag after successful sync
        dispatch(clearLocalBag());
      } else {
        // Otherwise, just fetch any existing online cart
        await dispatch(fetchCart(userSnapshot.id));
      }
      return userSnapshot;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpStart = createAsyncThunk(
  'user/signUp',
  async ({ email, password, displayName }, { dispatch, rejectWithValue }) => {
    try {
      // First create the user with email and password
      const signUpData = await signUpWithCredentialsWrapper(email, password);
      // Then create the user profile document
      await createUserProfileDocument(signUpData, { displayName, id: signUpData.uid });
      
      // Finally, get the user snapshot and return it
      const userSnapshot = await getUserSnapshot(signUpData, { displayName });
      return userSnapshot;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const signOutStart = createAsyncThunk(
  'user/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOutFromFirebase();
      // Clear online cart on sign out
      dispatch(clearOnlineCart());
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Check user session
      .addCase(checkUserSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Google sign in
      .addCase(googleSignInStart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSignInStart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(googleSignInStart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Email sign in
      .addCase(emailSignInStart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(emailSignInStart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(emailSignInStart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Sign out
      .addCase(signOutStart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutStart.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
        state.error = null;
      })
      .addCase(signOutStart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;
