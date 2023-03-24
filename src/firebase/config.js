//import firebase and firestore
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    projectId: 'react-native-pure-drop-app',
    appId: '1:621707134804:android:f67623484594259831eac1',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyCTIpj-lyY4MO1Evuh5JNOggjr1K3KnTcU",
//   authDomain: "puredrop-3ea2f.firebaseapp.com",
//   projectId: "react-native-pure-drop-app",
//   storageBucket: "puredrop-3ea2f.appspot.com",
//   messagingSenderId: "914062727516",
//   appId: "1:621707134804:android:f67623484594259831eac1",
//   measurementId: "G-4D0QGJC096"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const authenticatin = getAuth(app);