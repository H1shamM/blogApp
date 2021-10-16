// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2PQcAtIdSjuncchzERXbv1CuNpNnNZtk",
  authDomain: "usersproject-6223d.firebaseapp.com",
  projectId: "usersproject-6223d",
  storageBucket: "usersproject-6223d.appspot.com",
  messagingSenderId: "69255709594",
  appId: "1:69255709594:web:53ffb0de1835ed6c8df023",
  measurementId: "G-85EX42012F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
