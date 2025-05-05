import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../utils/useTitle";

const Login = () => {
	useTitle("Sign In");
	const navigate = useNavigate();
	const location = useLocation();
	const [isCredential, setIsCredential] = useState("");
	const { signInUser, googleSignIn } = useContext(AuthContext);

	const from = location.state?.from?.pathname || "/";

	const handleSignInUser = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.passKey.value;
		signInUser(email, password)
			.then((result) => {
				const user = { email: result.user.email };
				console.log(user);
				axios
					.post("http://localhost:5001/jwt", user, {
						withCredentials: true,
					})
					.then((data) => {
						console.log(data);
					});
			})
			.catch((error) => {
				if (error) {
					setIsCredential(error.message);
				}
			});
		e.target.reset();
		navigate(from, { replace: true });
	};

	const handleSignUpGoogle = () => {
		googleSignIn();
		navigate(from, { replace: true });
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<div className="max-w-xl mx-auto mt-32 ">
				<h2 className="text-3xl font-bold"> Log in</h2>
				<form onSubmit={handleSignInUser} className="fieldset ">
					<label className="fieldset-label">Email</label>
					<input
						name="email"
						type="email"
						className="input"
						placeholder="Email"
					/>
					<label className="fieldset-label">Password</label>
					<input
						name="passKey"
						type="password"
						className="input"
						placeholder="Password"
					/>
					<div>
						Don&apos;t have an account?{" "}
						<Link to={"/register"} className="link link-hover text-blue-500">
							{" "}
							Register Here...
						</Link>
					</div>
					{isCredential && (
						<>
							<p className="text-lg text-red-500">
								{isCredential.split("/")[1].slice(0, 18)} : Please Give email or
								password correctly
							</p>
						</>
					)}
					<button className="btn btn-primary w-80 mt-4">Login</button>
				</form>
				<button
					onClick={handleSignUpGoogle}
					className="btn bg-white text-black border-[#e5e5e5] w-80 hover:bg-accent"
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
	);
};

export default Login;
