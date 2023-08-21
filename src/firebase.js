import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAZw3qgCOD2NEPSpXIhpky9eYH6vh0gGU",
  authDomain: "vet-care-1b21e.firebaseapp.com",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
  projectId: "vet-care-1b21e",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
