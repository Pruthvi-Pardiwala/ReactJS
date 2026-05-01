import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDLXyOxrvJVOwsrw8gLeRsqFmgtKj6Wyhc",
  authDomain: "inventory-tracker-4393f.firebaseapp.com",
  databaseURL: "https://inventory-tracker-4393f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inventory-tracker-4393f",
  storageBucket: "inventory-tracker-4393f.firebasestorage.app",
  messagingSenderId: "319557519955",
  appId: "1:319557519955:web:8941920168a5cd8b7cd4a6"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);