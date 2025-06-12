
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlrqHrkWjxfZNjyCoq8xDwLcXv1TmC7PE",
  authDomain: "msnfakestore.firebaseapp.com",
  projectId: "msnfakestore",
  storageBucket: "msnfakestore.appspot.com",
  messagingSenderId: "743361476318",
  appId: "1:743361476318:web:1182e5c37d1f356c79344f",
  measurementId: "G-DG5RK16ELM"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider};
