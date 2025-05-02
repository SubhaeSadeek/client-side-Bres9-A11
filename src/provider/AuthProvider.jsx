import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = () => {
		setLoading(true);
		return signOut(auth);
	};

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((resutl) => {
				console.log(resutl.user);
			})
			.catch((error) => {
				console.log("ERROR", error);
			});
	};

	const userProfileInfo = (userName, image) => {
		updateProfile(auth.currentUser, {
			displayName: userName,
			photoURL: image,
		});
	};
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => {
			unSubscribe();
		};
	}, []);
	const authInfo = {
		user,
		loading,
		createUser,
		signInUser,
		signOutUser,
		googleSignIn,
		userProfileInfo,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};
AuthProvider.propTypes = {
	children: PropTypes.object,
};

export default AuthProvider;
