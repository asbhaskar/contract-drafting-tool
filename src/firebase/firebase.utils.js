import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCLeF9sdKkSL_gUB1Es6ZHP-A30tvczXPY",
    authDomain: "contract-drafting-tool.firebaseapp.com",
    databaseURL: "https://contract-drafting-tool.firebaseio.com",
    projectId: "contract-drafting-tool",
    storageBucket: "contract-drafting-tool.appspot.com",
    messagingSenderId: "71063615991",
    appId: "1:71063615991:web:ea3c6fca4a419a70b316f2",
    measurementId: "G-532H7YR3Y3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const saveUserDataInFirebase = (user) => {
    // console.log(user)
    let todaysDate = new Date()
    database.ref('users/' + user.uid).update({
        email: user.email,
        userName: user.displayName,
        photoUrl: user.photoURL,
        userId: user.uid,
        created: user.metadata.creationTime,
        lastLogin: user.metadata.lastSignInTime,
        lastSeen: todaysDate.toUTCString()
    })
}

// export const updateUserLastLoginTime = (user) => {
//     let todaysDate = new Date()
//     database.ref('users/' + user.uid).update({
//         lastSeen: todaysDate.toString()
//     })
// }

export const delTemplateFromFirebase = (userId, templateUid) => {
    database.ref('users/' + userId + '/templates/' + templateUid).remove()
    database.ref('templates/' + templateUid).remove()
}

export default firebase;
