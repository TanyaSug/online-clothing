import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyADAA3mr5ClPcAYESAIUWsvfUvhP-tJ4Zw",
    authDomain: "crwn-clothing-db-e96a8.firebaseapp.com",
    projectId: "crwn-clothing-db-e96a8",
    storageBucket: "crwn-clothing-db-e96a8.appspot.com",
    messagingSenderId: "22499973527",
    appId: "1:22499973527:web:b6a7a332471533bc204cd2"

};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        }
            catch(error) {
                console.log('error creating the user', error.message);
            }
        }
    return userDocRef;
};


