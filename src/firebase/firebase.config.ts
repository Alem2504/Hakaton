// src/firebase/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmWQB5YI8tGpic141I-eLK7ilnhLzgows",
  authDomain: "biotwin-abe23.firebaseapp.com",
  projectId: "biotwin-abe23",
  storageBucket: "biotwin-abe23.firebasestorage.app",
  messagingSenderId: "258495492099",
  appId: "1:258495492099:web:71a1f33a0ccc2335e65e36",
  measurementId: "G-39HWLR4EZ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
export { auth, db };
