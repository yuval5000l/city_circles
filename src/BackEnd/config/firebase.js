// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { Timestamp } from "firebase/firestore";
// import {getFunctions} from "firebase/functions";
// import {getAnalytics, setUserProperties} from "firebase/analytics";
// import { getAnalytics } from "firebase/analytics"; // TODO if we want analytics
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmuOoA_Z3eNzkbTVOVyvfDZWEx-s6HrsU",
    authDomain: "citycircle-a1014.firebaseapp.com",
    projectId: "citycircle-a1014",
    storageBucket: "citycircle-a1014.appspot.com",
    messagingSenderId: "257022128152",
    appId: "1:257022128152:web:1a790c1416fa1c7020d36d",
    measurementId: "G-5T05DYZSF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

// export const functions = getFunctions(app);

export const timestamp = Timestamp;
