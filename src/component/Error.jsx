import { Link, useRouteError } from "react-router-dom";
import errorImg from "../assets/error-parachute.png";

const Error = () => {
	const error = useRouteError();
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-1/3 flex flex-col justify-center items-center">
				<img src={errorImg} alt="" />
				<h1 className="text-base md:text-2xl text-themeText font-semibold">
					Oops! Something went wrong
				</h1>
				<h1 className="font-semibold text-red-600">{error.data}</h1>
				<p>Brace yourself till we get the error fixed!</p>
				<h1 className="text-base md:text-2xl text-red-600 font-semibold">
					Error Status: {error.status}
				</h1>
				<Link to={"/"}>
					<button className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl mt-6 rounded-4xl">
						Well! Lets Go Home
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Error;
