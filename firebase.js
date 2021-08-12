import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCEuKWNWgMXUe3sdfLecGypWTdbmtMd5NI",
  authDomain: "todo-list-6963d.firebaseapp.com",
  projectId: "todo-list-6963d",
  storageBucket: "todo-list-6963d.appspot.com",
  messagingSenderId: "50140325903",
  appId: "1:50140325903:web:edc619547f15879242db7a",
  measurementId: "G-YC39EJX49W"
};
const app =  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export { db };