import { getApp, initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  connectFirestoreEmulator, 
  doc, 
  getDoc, 
  getFirestore, 
  setDoc, 
  writeBatch, 
  getDocs,
  query,
  where 
} from "firebase/firestore";

// In the upcoming lessons, we will adding firebase to our 
// React application. One thing to note, is that we will be 
// adding a config object that we get from firebase into our 
// files, and in that config object is an API key. Typically 
// it is good practice not to expose your API key publicly, 
// but in the case of firebase, we have to do so because 
// this is how firebase knows the application is ours! This 
// is perfectly safe, and the intended purpose of this public 
// API key. If you commit your code to Github, you may get a 
// warning from GitGuardian having caught a google key, but 
// GitGuardian has acknowledged that this is not an issue here!

// How we do secure out data is actually done with security rules
//  in the firebase dashboard, but we will cover that in a later 
//  lesson! So please continue the course without worry :)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Note: Use a different firebase project in Production.

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// Initialize Firebase
const firebaseApp = createFirebaseApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Reference to the specific user document
  const userRef = doc(firestore, "users", userAuth.uid);
  // Fetch the user document
  const snapShot = await getDoc(userRef);

  if (snapShot.exists()) {
    console.error("Error creating user");
  } else {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const getUserCartRef = async userId => {
  const cartsRef = query(collection(firestore, 'carts'), where('userId', '==', userId));
  const snapShot = await getDocs(cartsRef);

  if (snapShot.empty) {
    const cartDocRef = doc(collection(firestore, 'carts'));
    await setDoc(cartDocRef, { userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedArray = collections.docs.map(doc => {
    const { title, items } = doc.data();
    console.log(title);
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedArray.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Sign in with email and password.
export const signInWithCredentialsWrapper = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    return  await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.message === "Firebase: Error (auth/user-not-found).") {
      throw new Error("The email/password combination is incorrect.");
    } else {
      throw new Error("Something went wrong. Please try again or contact support.");
    }
    throw error;
  }
};

// Sign up with email and password.
export const signUpWithCredentialsWrapper = async (email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user;
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      throw new Error("The email/password combination is incorrect.");
    } else {
      throw new Error("Something went wrong. Please try again or contact support.");
    }
    throw error;
  }
};

// Send registration verification email.
export const sendRegistrationVerificationEmail = async (user) => {
  try {
    return await sendEmailVerification(user);
  } catch (error) {
    console.error("Error verifying confirmation code:", error);
    return false;
  }
};

// Sign out from Firebase.
export const signOutFromFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export default firebaseApp;