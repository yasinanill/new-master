

import {useEffect} from "react";
import { logout } from "../firebaseConfig";

export default function Logout() {

	useEffect(() => {
		logout()
	})

	return null

}