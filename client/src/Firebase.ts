import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO-ylU7vdZ5Pdab8xcvC2F8WewcrZqqNM",
  authDomain: "medscan-439717.firebaseapp.com",
  projectId: "medscan-439717",
  storageBucket: "medscan-439717.appspot.com",
  messagingSenderId: "296479925771",
  appId: "1:296479925771:web:fd90f7a22974cb1316090e",
  scope: "https://www.googleapis.com/auth/fitness.activity.read	https://www.googleapis.com/auth/fitness.blood_pressure.read	https://www.googleapis.com/auth/fitness.heart_rate.read	https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read	https://www.googleapis.com/auth/fitness.sleep.read"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

