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

	// Auth operations
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
		return signOut(auth).finally(() => setLoading(false));
	};

	const googleSignIn = () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider).finally(() => setLoading(false));
	};

	const userProfileInfo = (userName, image) => {
		return updateProfile(auth.currentUser, {
			displayName: userName,
			photoURL: image,
		});
	};

	// Auth state listener
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => unSubscribe();
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
		<AuthContext.Provider value={authInfo}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
