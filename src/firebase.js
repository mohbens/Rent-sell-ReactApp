// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyACMg9GXniSCyya5pU2O9CGjB-CSR8vd3w",
	authDomain: "realtorclone-exercice.firebaseapp.com",
	projectId: "realtorclone-exercice",
	storageBucket: "realtorclone-exercice.appspot.com",
	messagingSenderId: "204197902465",
	appId: "1:204197902465:web:57424f61880cdcf33af580",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
