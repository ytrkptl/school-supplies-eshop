import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, collection, doc, getDoc } from "firebase/firestore";
import { products } from "../../../documentation/products_data_reorganized.js";
import { categoryImagesData } from "../../../documentation/category_images.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const cleanItem = (item) => {
  const { id, name, price, imageUrl } = item;
  return { id, name, price, imageUrl };
};

export const seedCollections = async () => {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    // Create a batch write
    console.log('Preparing to seed collections...');
    const batch = writeBatch(firestore);
    const collectionsRef = collection(firestore, 'collections');
    
    let needsSeeding = false;
    
    for (const collection of products) {
      const routeName = collection.title.toLowerCase().replace(/\s/g, '-');
      const docRef = doc(collectionsRef, routeName);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        needsSeeding = true;
        const cleanedItems = collection.items.map(item => cleanItem(item));
        console.log(`Preparing collection: ${collection.title}`);
        
        batch.set(docRef, {
          title: collection.title,
          routeName: routeName,
          id: routeName,
          items: cleanedItems,
          imageUrl: categoryImagesData[collection.title].imageUrl,
          displayOrderId: categoryImagesData[collection.title].displayOrderId
        });
      } else {
        console.log(`Collection ${collection.title} already exists`);
      }
    }

    if (needsSeeding) {
      console.log('Committing changes to Firestore...');
      await batch.commit();
      console.log('✅ Collections successfully seeded');
    } else {
      console.log('All collections already exist, no seeding needed');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding collections:', error);
    process.exit(1);
  }
};

// Run the seeding
seedCollections();
