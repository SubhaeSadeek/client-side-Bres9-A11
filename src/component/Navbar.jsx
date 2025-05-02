import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo-hikmah.jpeg";
import { AuthContext } from "../provider/AuthProvider";
import ToggleModeTheme from "./ToggleModeTheme";

const Navbar = () => {
	const { user, signOutUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const signOutUsers = () => {
		signOutUser()
			.then(() => {
				console.log("signed out successfully");
			})
			.catch((error) => {
				console.log("Error while signed out", error);
			});
		navigate("");
	};
	const navigationLink = (
		<>
			<li>
				<NavLink
					to={"/"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							marginRight: "1rem",
						};
					}}
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/allReviews"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							marginRight: "1rem",
						};
					}}
				>
					All Reviews
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/addReview"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							marginRight: "1rem",
						};
					}}
				>
					Add Review
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/myReview"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							marginRight: "1rem",
						};
					}}
				>
					My Reviews
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/watchList"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							marginRight: "3rem",
						};
					}}
				>
					My Watchlist
				</NavLink>
			</li>
		</>
	);
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						{navigationLink}
					</ul>
				</div>
				<NavLink
					to={"/"}
					className="text-xl font-bold cursor-pointer hover:scale-110  hover:bg-white/30 hover:p-2 hover:rounded-badge duration-500"
				>
					<img className="w-1/3" src={logo} alt="" />
				</NavLink>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className=" menu-horizontal px-1">{navigationLink}</ul>
			</div>
			<div className="navbar-end gap-1.5">
				<ToggleModeTheme></ToggleModeTheme>
				{user ? (
					<>
						{/* <p>{user.email}</p> */}

						{/* *************** */}

						<div className="tooltip tooltip-bottom">
							<div className="tooltip-content">
								<div className="animate-bounce text-orange-400 -rotate-5 text-lg font-semibold">
									{user.displayName}
								</div>
							</div>
							<div className="avatar">
								<div className="w-10 rounded-full">
									<img src={user?.photoURL} />
								</div>
							</div>
						</div>
						{/* *************** */}
						<button
							onClick={signOutUsers}
							className="btn btn-neutral rounded-4xl"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to={"/login"}>
							<button className="btn btn-outline rounded-4xl">Login</button>
						</Link>
						<Link to={"/register"}>
							<button className="btn btn-accent rounded-4xl">Register</button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
