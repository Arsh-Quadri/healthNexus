import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-GcKb1sWPMyBkE4UgyzIuyc90_VRQdhc",
  authDomain: "healthnexus-84eb0.firebaseapp.com",
  projectId: "healthnexus-84eb0",
  storageBucket: "healthnexus-84eb0.appspot.com",
  messagingSenderId: "739794895278",
  appId: "1:739794895278:web:185e9ff295f81789bcc83f",
  measurementId: "G-WR26BY40V4",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

export { app, auth, database, storage };
