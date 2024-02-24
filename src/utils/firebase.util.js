// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOsqhoKTZXijM-eszeNuhJXVk3r4oz6zU",
  authDomain: "crwn-clothing-db-c16d8.firebaseapp.com",
  projectId: "crwn-clothing-db-c16d8",
  storageBucket: "crwn-clothing-db-c16d8.appspot.com",
  messagingSenderId: "188141881917",
  appId: "1:188141881917:web:a9c247f521c3625c7ff854",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating user!", error);
    }
  }
  return userDocRef;
};

export const createAuthUSerWithUsernameAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;
  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  return userAuth;
};
