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
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged
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
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// Emulator setup
function startEmulators() {
  try {
    connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
    connectFirestoreEmulator(firestore, "localhost", 8080);
    console.log('🔥 Connected to Firebase emulators');
  } catch (error) {
    console.error('Error connecting to emulators:', error);
  }
}

// Start emulators in development mode
if (import.meta.env.MODE === 'development') {
  startEmulators();
}

// Initialize persistence after emulator setup
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting local persistence:", error);
});

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
    const { title, routeName, items } = doc.data();
    return {
      routeName: routeName || title.toLowerCase().replace(/\s/g, '-'),
      id: doc.id,
      title,
      items
    };
  });

  const reducedObject = transformedArray.reduce((accumulator, collection) => {
    accumulator[collection.routeName] = collection;
    return accumulator;
  }, {});

  return reducedObject;
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
  }
};

// Sign up with email and password.
export const signUpWithCredentialsWrapper = async (email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user;
  } catch (error) {
    //console.log('error creating user', error.message);
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      throw new Error("The email/password combination is incorrect.");
    } else {
      throw new Error("Something went wrong. Please try again or contact support.");
    }
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
    const unsubscribe = onAuthStateChanged(auth, 
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, 
      error => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const cleanItem = (item) => {
  const { id, name, price, imageUrl } = item;
  return { id, name, price, imageUrl };
};

export const checkAndSeedCollections = async () => {
  // Only seed in development
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  try {
    // Import the data directly in development
    const { products } = (await import('../../../data/products_data_reorganized.js'));
    const { categoryImagesData } = (await import('../../../data/category_images.js'));
    // First create a test user if needed for auth rules
    const userAuth = auth.currentUser;
    if (!userAuth) {
      console.log('No user authenticated, signing in anonymously for seeding...');
      await signInAnonymously(auth);
    }

    // Create a batch write
    const batch = writeBatch(firestore);
    const collectionsRef = collection(firestore, 'collections');
    
    // Check existing documents and prepare batch
    let needsSeeding = false;
    
    for (const collection of products) {
      const routeName = collection.title.toLowerCase().replace(/\s/g, '-');
      const docRef = doc(collectionsRef, routeName);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        needsSeeding = true;
        // Clean the items data
        const cleanedItems = collection.items.map(item => cleanItem(item));
        // console.log(categoryImagesData[collection.title]);
        batch.set(docRef, {
          title: collection.title,
          routeName: routeName,
          id: routeName,
          items: cleanedItems,
          imageUrl: categoryImagesData[collection.title].imageUrl,
          displayOrderId: categoryImagesData[collection.title].displayOrderId
        });
      } else {
        console.log(`Collection ${collection.title} already exists, skipping`);
      }
    }

    // Only commit if we have new documents to add
    if (needsSeeding) {
      await batch.commit();
      console.log('✅ New collections successfully seeded to development environment');
    } else {
      console.log('All collections already exist, no seeding needed');
    }

    // Sign out if we signed in anonymously
    if (!userAuth) {
      await auth.signOut();
    }
  } catch (error) {
    console.error('❌ Error seeding collections:', error);
    throw error;
  }
};

export default firebaseApp;
