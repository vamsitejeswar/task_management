import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP3SNrDlDIYm9uNnzrOMVqcYQIOfDE0ZU",
  authDomain: "task-management-467d3.firebaseapp.com",
  projectId: "task-management-467d3",
  storageBucket: "task-management-467d3.firebasestorage.app",
  messagingSenderId: "97132286097",
  appId: "1:97132286097:web:21096044e951f5f982af30"
};

// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
