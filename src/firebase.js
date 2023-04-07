import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXsLl23NMaCzyEcdww5Z3JvvWzMLiRpdY",
  authDomain: "taskapp-34439.firebaseapp.com",
  projectId: "taskapp-34439",
  storageBucket: "taskapp-34439.appspot.com",
  messagingSenderId: "400724679517",
  appId: "1:400724679517:web:e4ee2c92d7dac0d611a6b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
