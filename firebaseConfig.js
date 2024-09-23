import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3qNY4n04Xi41nWree16vSQaQsi7KeP34",
    authDomain: "fir-auth-fed20.firebaseapp.com",
    projectId: "fir-auth-fed20",
    storageBucket: "fir-auth-fed20.appspot.com",
    messagingSenderId: "524790218872",
    appId: "1:524790218872:web:ff3bbc58f9ff3a008d6d8d",
    measurementId: "G-S5L0WVWBGZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
