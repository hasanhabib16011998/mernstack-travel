// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw-jaA3igmiw0SpppyyYK6NMtoerHVAyQ",
  authDomain: "travel-658f1.firebaseapp.com",
  projectId: "travel-658f1",
  storageBucket: "travel-658f1.appspot.com",
  messagingSenderId: "278292453899",
  appId: "1:278292453899:web:149ed1a92754c7d972850e",
  measurementId: "G-9LH52HPK57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage=getStorage();