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
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return await getUserSnapshot(result.user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const emailSignInStart = createAsyncThunk(
  'user/emailSignIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return await getUserSnapshot(result.user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpStart = createAsyncThunk(
  'user/signUp',
  async ({ email, password, displayName }, { dispatch, rejectWithValue }) => {
    try {
      const user = await signUpWithCredentialsWrapper(email, password, displayName);
      const userSnapshot = await getUserSnapshot(user, { displayName });
      return userSnapshot;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutStart = createAsyncThunk(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOutFromFirebase();
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
