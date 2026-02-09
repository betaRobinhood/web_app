import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi7oKwy0DOH4Q4KwYqnkZaBWjM5e7hNZc",
  authDomain: "expenseapp-f696f.firebaseapp.com",
  projectId: "expenseapp-f696f",
  storageBucket: "expenseapp-f696f.firebasestorage.app",
  messagingSenderId: "1041767521953",
  appId: "1:1041767521953:web:81d544a9c56163eeabdae0",
  measurementId: "G-Y9F6LSND8R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
