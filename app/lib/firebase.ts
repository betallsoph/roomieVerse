import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnEkzMNFOcCONP4_kzG0oItcy_nl8u_O0",
  authDomain: "roomieverse-knkn.firebaseapp.com",
  projectId: "roomieverse-knkn",
  storageBucket: "roomieverse-knkn.firebasestorage.app",
  messagingSenderId: "1035224581854",
  appId: "1:1035224581854:web:adbc6e101b0eed4d9f644f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
