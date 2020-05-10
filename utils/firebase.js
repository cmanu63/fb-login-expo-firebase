import * as firebase from "firebase";

const config = {
    "apiKey": "AIzaSyA13pWiAe-Nd_jgXb32XxFeeqZHk8wK34A",
    "authDomain": "login-app-29ca7.firebaseapp.com",
    "databaseURL": "https://login-app-29ca7.firebaseio.com",
    "projectId": "login-app-29ca7",
    "storageBucket": "login-app-29ca7.appspot.com",
    "messagingSenderId": "609943947208",
    "appId": "1:609943947208:web:cc3b587aabe285abe1a2fd"
  };

firebase.initializeApp(config);

export default firebase;