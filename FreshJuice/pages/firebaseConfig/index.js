import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, query, getDocs, collection, where, addDoc,} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1-fDGvAoKq68G99SmzyQsMFFcVkMI4bc",
  authDomain: "delivery-juice-fresh.firebaseapp.com",
  projectId: "delivery-juice-fresh",
  storageBucket: "delivery-juice-fresh.appspot.com",
  messagingSenderId: "1057046900827",
  appId: "1:1057046900827:web:f5a100018f615ba5524f7e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logout,
  storage,
  app
};