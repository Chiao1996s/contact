// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './Secrets';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };