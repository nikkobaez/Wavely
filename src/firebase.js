import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA3KPhaLmHfo2gGzrRneqbms-d5N0rKN0",
  authDomain: "wavely-2e687.firebaseapp.com",
  projectId: "wavely-2e687",
  storageBucket: "wavely-2e687.appspot.com",
  messagingSenderId: "861506118279",
  appId: "1:861506118279:web:121412150e817294dd0e22"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();