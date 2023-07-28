import {
  initializeApp,
  getApp,
  FirebaseOptions,
  FirebaseApp,
} from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const createFirebaseApp = (config: FirebaseOptions) => {
  try {
    return initializeApp(config);
  } catch (error) {
    return getApp();
  }
};

// Initialize Firebase
const firebaseApp: FirebaseApp = createFirebaseApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth: Auth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
const firestoreDb: Firestore = getFirestore(firebaseApp);

export { firebaseAuth, firestoreDb, signInWithEmailAndPassword };

export default firebaseApp;
