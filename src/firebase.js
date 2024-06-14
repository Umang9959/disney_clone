import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAtVpZmNRTfCfXoeL0Zixirp8sl-WNBQGk",
  authDomain: "hotstar-clone-b5ad0.firebaseapp.com",
  projectId: "hotstar-clone-b5ad0",
  storageBucket: "hotstar-clone-b5ad0.appspot.com",
  messagingSenderId: "658524722649",
  appId: "1:658524722649:web:6ed94e80ab4e280eb175c8",
  measurementId: "G-DS30REVMY7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;