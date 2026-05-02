import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCv3oG9SzCSuvdx-1wcTspktf6TdSEGA9M",
  authDomain: "fir-auth-system-2ea7f.firebaseapp.com",
  projectId: "fir-auth-system-2ea7f",
  storageBucket: "fir-auth-system-2ea7f.firebasestorage.app",
  messagingSenderId: "94454276370",
  appId: "1:94454276370:web:dd13fd18627ec97918d3cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;