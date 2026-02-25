import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "prepmate-ai-auth.firebaseapp.com",
  projectId: "prepmate-ai-auth",
  storageBucket: "prepmate-ai-auth.firebasestorage.app",
  messagingSenderId: "593863437333",
  appId: "1:593863437333:web:cdfe87731b877a5db5f21c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
