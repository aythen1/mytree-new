// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtugUNvO9HPVinw9vbzKv15aUzOiKUKJk",
  authDomain: "mytree-1dc3a.firebaseapp.com",
  projectId: "mytree-1dc3a",
  storageBucket: "mytree-1dc3a.appspot.com",
  messagingSenderId: "315315883521",
  appId: "1:315315883521:web:24d54fe0e80bcd0d7efa00",
  measurementId: "G-3J7B6ZVGWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);