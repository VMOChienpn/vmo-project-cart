import firebase from "firebase/app";

var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.EACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_I
};
firebase.initializeApp(config);
require('firebase/database')

// const dataFoods = firebase.database().ref('products/' + 'foods');
// const dataDrinks = firebase.database().ref('products/' + 'drinks');
// const dataUsers = firebase.database().ref('products/' + 'users');

export default firebase;
