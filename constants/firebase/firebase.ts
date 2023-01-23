import * as env from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
// import { getAuth, initializeAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore();

export { auth, db };
