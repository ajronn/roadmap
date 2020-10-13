import firebase from 'firebase';
import '@firebase/auth';

const config = {
    apiKey: "AIzaSyCKKphJqrdKNdPyvMuHGUI-O3EzEm2cWGY",
    authDomain: "roadmap-aee71.firebaseapp.com",
    databaseURL: "https://roadmap-aee71.firebaseio.com",
    projectId: "roadmap-aee71",
    storageBucket: "roadmap-aee71.appspot.com",
    messagingSenderId: "485302220910",
    appId: "1:485302220910:web:67dd159acb5a45622d0e7f"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;