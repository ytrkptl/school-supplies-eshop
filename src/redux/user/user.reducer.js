import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  auth, 
  googleProvider, 
  createUserProfileDocument,
  getCurrentUser
} from '@/utils/firebase/firebase.utils';

// Helper function to get user snapshot
const getUserSnapshot = async (userAuth, additionalData) => {
  const userRef = await createUserProfileDocument(userAuth, additionalData);
  const userSnapshot = await userRef.get();
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
      const { user } = await auth.signInWithPopup(googleProvider);
      return await getUserSnapshot(user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const emailSignInStart = createAsyncThunk(
  'user/emailSignIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      return await getUserSnapshot(user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpStart = createAsyncThunk(
  'user/signUp',
  async ({ email, password, displayName }, { dispatch, rejectWithValue }) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
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
      await auth.signOut();
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle all pending states
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      // Handle all fulfilled states
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false;
          state.currentUser = action.payload;
          state.error = null;
        }
      )
      // Handle all rejected states
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  }
});

export default userSlice.reducer;
