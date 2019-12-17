import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCYU0En8y_GeRiDEKvNWyQiKpTxfjYweMw",
  authDomain: "react-e4b52.firebaseapp.com",
  databaseURL: "https://react-e4b52.firebaseio.com",
  projectId: "react-e4b52",
  storageBucket: "react-e4b52.appspot.com",
  messagingSenderId: "518446581597",
  appId: "1:518446581597:web:3565be6dd4a2d01d9ecab4",
  measurementId: "G-XMR2YZBLW4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
