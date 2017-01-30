import * as firebase from "firebase"

// Set the configuration for the app
const config = {
  apiKey: "AIzaSyDfzeN-MZd2GvHfbB7Kto6PQLkIj5eNG90",
  authDomain: "timeup-7c1b3.firebaseapp.com",
  databaseURL: "https://timeup-7c1b3.firebaseio.com",
  storageBucket: "timeup-7c1b3.appspot.com",
  messagingSenderId: "379730791103"
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

function getHospitals() {
  const result = database
    .ref('/hospitals')
    .once('value')
  // returns a promise
  return result
}

export {getHospitals}
