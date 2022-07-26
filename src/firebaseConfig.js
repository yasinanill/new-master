import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import toast from "react-hot-toast";
import { userHandle } from "./utils";


const firebaseConfig = {
    apiKey: "AIzaSyAqGW7zYqvzsPf5W2ITtp-vZ9JXQnkzHdg",
    authDomain: "instagram-react-web-clone.firebaseapp.com",
    projectId: "instagram-react-web-clone",
    storageBucket: "instagram-react-web-clone.appspot.com",
    messagingSenderId: "869189500720",
    appId: "1:869189500720:web:32aee8acada32a605b52f5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

onAuthStateChanged(auth, user => {
	userHandle(user || false)
})


export const login = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password)


	} catch (err) {
		toast.error(err.code)
	}
}

export const logout = async () => {
	try {
		await signOut(auth)
	} catch (err) {
		toast.error(err.code)
	}
}