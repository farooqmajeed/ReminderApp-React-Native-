import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBcy_d9H5_4bVS_gCs6qvS6yzIWqEZLtdY",
    authDomain: "rememberingapp-53f33.firebaseapp.com",
    databaseURL: "https://rememberingapp-53f33.firebaseio.com",
    projectId: "rememberingapp-53f33",
    storageBucket: "rememberingapp-53f33.appspot.com",
    messagingSenderId: "520424448006"
};
firebase.initializeApp(config);


export const database = firebase.database();

export const auth = firebase.auth();

export default firebase;