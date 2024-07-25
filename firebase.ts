import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAr1aK7k96tYHks52JGhaltp1_zNiCmDW0",
    authDomain: "link-sharing-app-ebe6a.firebaseapp.com",
    projectId: "link-sharing-app-ebe6a",
    storageBucket: "link-sharing-app-ebe6a.appspot.com",
    messagingSenderId: "907413792524",
    appId: "1:907413792524:web:052e990d735c7659fecb29"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
