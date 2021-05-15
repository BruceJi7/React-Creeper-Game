import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCrx6zJwj0DZ3HUmLN2TuDkndcWFqFnEGs",
  authDomain: "react-creeper-game.firebaseapp.com",
  databaseURL:
    "https://react-creeper-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-creeper-game",
  storageBucket: "react-creeper-game.appspot.com",
  messagingSenderId: "487718621998",
  appId: "1:487718621998:web:5b8b10c32c6f7b7426e0bf",
  measurementId: "G-TGHQ7GWD6Y",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
