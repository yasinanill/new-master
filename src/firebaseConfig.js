import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore"
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
const db = getFirestore(app);







onAuthStateChanged(auth, async user => {
	if (user) {
		const dbUser = await getDoc(doc(db, "users", user.uid))
		let data = {
			uid: user.uid,
			fullName: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
			...dbUser.data()
		}
		userHandle(data)
	} else {
		userHandle(false)
	}

})




export const login = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password)


	} catch (err) {
		toast.error(err.code)


	}
}


export const getUserInfo = async uname => {
	const username = await getDoc(doc(db, "usernames", uname))
	if (username.exists()) {
		return (await getDoc(doc(db, "users", username.data().user_id))).data()
	} else {
		toast.error("Kullanıcı bulunamadı!")
		throw new Error("Kullanıcı bulunamadı!")
	}
}





export const register = async ({email, password, full_name, username}) => {
	try {
		const user = await getDoc(doc(db, "usernames", username))
		if (user.exists()) {
			toast.error(`${username} kullanıcı adı başkası tarafından kullanılıyor.`)
		} else {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			if (response.user) {

				await setDoc(doc(db, "usernames", username), {
					user_id: response.user.uid
				})

				await setDoc(doc(db, "users", response.user.uid), {
					fullName: full_name,
					username: username,
					followers: [],
					following: [],
					notifications: [],
					website : "",
					bio : "",	
					phoneNumber : "",
					gender:'',
					post: 0,

				})

				await updateProfile(auth.currentUser, {
					displayName: full_name
				})

				return response.user

			}
		}
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