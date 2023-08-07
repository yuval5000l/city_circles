// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5M63YpW4cyfJFYqUQabnBAByHaKWg6KU",
    authDomain: "city-circle-test-data.firebaseapp.com",
    projectId: "city-circle-test-data",
    storageBucket: "city-circle-test-data.appspot.com",
    messagingSenderId: "74343188055",
    appId: "1:74343188055:web:0f2f30144296c76e6bc512",
    measurementId: "G-LN0VYL1YE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);