import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyCZ-x18GBB_CXYXwccmth_mXfG-bOvKIiM",
    authDomain: "summative-45a0e.firebaseapp.com",
    projectId: "summative-45a0e",
    storageBucket: "summative-45a0e.firebasestorage.app",
    messagingSenderId: "45120500861",
    appId: "1:45120500861:web:4972832fc9121ef25e6d14"
};


const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };