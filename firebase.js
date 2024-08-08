import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Initialize Firebase (Replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyA90estn7n9YHRfflmdmoMibKn8_WVlGN4",
  authDomain: "inventorymanagement-f77e8.firebaseapp.com",
  projectId: "inventorymanagement-f77e8",
  storageBucket: "inventorymanagement-f77e8.appspot.com",
  messagingSenderId: "1088045410726",
  appId: "1:1088045410726:web:db198d9c12c72c4fd6c767",
  measurementId: "G-63R1TQCQBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {firestore}
