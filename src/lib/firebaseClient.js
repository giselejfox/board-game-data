// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "board-game-data.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "board-game-data",
    storageBucket: "board-game-data.firebasestorage.app",
    messagingSenderId: "916896249994",
    appId: "1:916896249994:web:9cfef0a04044219b4c1573"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const db = getDatabase(app);

export default db;