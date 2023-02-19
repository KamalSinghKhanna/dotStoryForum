import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQWgGQaNjBnswxEIuSeMDCZopzHAkbkgk',
  authDomain: 'dotstory-media.firebaseapp.com',
  projectId: 'dotstory-media',
  storageBucket: 'dotstory-media.appspot.com',
  messagingSenderId: '105432680167',
  appId: '1:105432680167:web:741c1115b0b13b96a5c442',
  measurementId: 'G-N6Y6B2BY2K',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

// providers
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, db, googleAuthProvider };
