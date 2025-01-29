import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

const config = {
  apiKey: "AIzaSyBSYlff3UCP2gAJLL_AAwdU2aTVVmUCLfc",
  authDomain: "crwn-db-f8b87.firebaseapp.com",
  databaseURL: "https://crwn-db-f8b87.firebaseio.com",
  projectId: "crwn-db-f8b87",
  storageBucket: "crwn-db-f8b87.appspot.com",
  messagingSenderId: "838632403416",
  appId: "1:838632403416:web:e1be8013d37cf990"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
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
  const cartsRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;