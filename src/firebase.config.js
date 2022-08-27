import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';




const firebaseConfig = {
    apiKey: "AIzaSyA7oFS0eJLTF89p_PM2T7qWau6MjU1ctrQ",
    authDomain: "restautantapp-60227.firebaseapp.com",
    databaseURL: "https://restautantapp-60227-default-rtdb.firebaseio.com",
    projectId: "restautantapp-60227",
    storageBucket: "restautantapp-60227.appspot.com",
    messagingSenderId: "1082915432916",
    appId: "1:1082915432916:web:aebe736961213a16ef0e41"
  };

const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage  };