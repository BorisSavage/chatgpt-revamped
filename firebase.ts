import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgUTqWnsU5vw6zFV6cWaaYshCoJIrg8t8",
    authDomain: "dangpt-generator.firebaseapp.com",
    projectId: "dangpt-generator",
    storageBucket: "dangpt-generator.appspot.com",
    messagingSenderId: "1007098994952",
    appId: "1:1007098994952:web:68747e09b2a01c87900cbd",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
