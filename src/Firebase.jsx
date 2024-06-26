// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBVha9vChvXBpWG7O8sBGg11NGx4zgGH2M",
  authDomain: "dbwebmanajemenbuku.firebaseapp.com",
  databaseURL: "https://dbwebmanajemenbuku-default-rtdb.firebaseio.com",
  projectId: "dbwebmanajemenbuku",
  storageBucket: "dbwebmanajemenbuku.appspot.com",
  messagingSenderId: "540875928342",
  appId: "1:540875928342:web:0093c0bbdc9f10a83e9637",
  measurementId: "G-STRTC0SF25"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app)

export { database, auth };
