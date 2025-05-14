import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../utils/useTitle";

const Register = () => {
	useTitle("Sign Up");
	const location = useLocation();
	const navigate = useNavigate();
	const from = location?.state?.from?.pathname || "/";
	const { createUser, googleSignIn, userProfileInfo } = useContext(AuthContext);
	// const navigate = useNavigate();
	const [inputValidate, setInputValidate] = useState("");

	const handleRegisterSubmit = (e) => {
		setInputValidate("");
		e.preventDefault();
		const displayName = e.target.userName.value;
		const emailValue = e.target.email.value;
		const photoURL = e.target.photoURL.value;
		const passkeyValue = e.target.passkey.value;
		const passConfirm = e.target.passkeyConfirm.value;

		if (passkeyValue !== passConfirm) {
			setInputValidate("connfirm password does not match");
			return;
		}

		if (passkeyValue.length < 6) {
			setInputValidate("Password must be minimum six charecter long");
			return;
		}
		if (!/[a-z]/.test(passkeyValue)) {
			setInputValidate("you must give one lower case latter");
			return;
		}
		if (!/[A-Z]/.test(passkeyValue)) {
			setInputValidate("you must give one upper case latter");
			return;
		}

		createUser(emailValue, passkeyValue)
			.then((result) => {
				const user = result.user;
				return updateProfile(user, {
					displayName: `${displayName}`,
					photoURL: `${photoURL}`,
				}).then(() => {
					if (result.user) {
						Swal.fire({
							title: "Success!",
							text: `${result?.user?.displayName}, You are registered successfully with ${result.user.email} !`,
							icon: "success",
							confirmButtonText: "Ok",
						});
					}

					const userData = {
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
						signInTime: user.metadata.lastSignInTime,
					};
					/* fetch("https://server-side-bres9-a10.onrender.com/user", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(userData),
					}); */
					axios.post("https://hikmah-server.vercel.app/user", userData);
					userProfileInfo(displayName, photoURL);
					/* console.log(userData);
					console.log(result); */
				});
			})
			.catch((error) => {
				if (error.code) {
					Swal.fire({
						title: "Ouch!",
						text: `${error?.message}`,
						icon: "error",
						confirmButtonText: "Try Again",
					});
				}
			});
		e.target.reset();
		navigate(from, { replace: true });
	};

	const handleSignUpGoogle = () => {
		googleSignIn();
	};

	return (
		<div>
			<div className="md:w-3/5 mx-auto mt-12">
				<h2 className="text-3xl md:w-3/5 mx-auto font-bold ">Register Here</h2>
				<form
					onSubmit={handleRegisterSubmit}
					className="fieldset relative md:w-1/2 mx-auto"
				>
					<label className="fieldset-label">Name</label>
					<input
						name="userName"
						type="text"
						className="input"
						placeholder="your Name"
					/>
					<label className="fieldset-label">Email</label>
					<input
						name="email"
						type="email"
						className="input"
						placeholder="Email"
					/>
					<label className="fieldset-label">
						Photo <i>(please give URL of your Photo)</i>
					</label>
					<input
						name="photoURL"
						type="text"
						className="input"
						placeholder="your PhotoURL"
					/>
					<label className="fieldset-label">Password</label>
					<input
						name="passkey"
						type="password"
						className="input"
						placeholder="Password"
					/>
					<label className="fieldset-label">Confirm Password</label>
					<input
						name="passkeyConfirm"
						type="password"
						className="input"
						placeholder="Confirm Password"
					/>
					<div>
						Already registered?{" "}
						<Link to={"/login"} className="link link-hover text-green-800">
							{" "}
							Please Login here...{" "}
						</Link>
					</div>
					{inputValidate && (
						<p className="text-lg text-red-600">{inputValidate}</p>
					)}
					<button className="btn btn-accent mt-4 w-40 md:w-80 mx-auto">
						Register
					</button>
				</form>
				<div className="mt-3 md:w-3/5 mx-auto flex justify-center md:pl-4 ">
					<button
						onClick={handleSignUpGoogle}
						className="btn bg-white text-black border-[#e5e5e5]  md:w-80 hover:bg-accent"
					>
						<svg
							aria-label="Google logo"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<g>
								<path d="m0 0H512V512H0" fill="#fff"></path>
								<path
									fill="#34a853"
									d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
								></path>
								<path
									fill="#4285f4"
									d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
								></path>
								<path
									fill="#fbbc02"
									d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
								></path>
								<path
									fill="#ea4335"
									d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
								></path>
							</g>
						</svg>
						Login with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
