
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAegaES63KTEsq-Q9OiyJnvdJTICF0Je0s",
    authDomain: "clone-732e1.firebaseapp.com",
    projectId: "clone-732e1",
    storageBucket: "clone-732e1.appspot.com",
    messagingSenderId: "201332352313",
    appId: "1:201332352313:web:0cbb89932a8aee76ecb4e8",
    measurementId: "G-VP7T8EPQ8V"
  };

  firebase.initializeApp(firebaseConfig);

  export const storage = firebase.storage();
  export  const authe = firebase.auth()
  export const db = firebase.firestore();

   
