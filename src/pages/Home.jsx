import { Link } from "react-router-dom";
import HomeCard from "../component/HomeCard";

const Home = () => {
	return (
		<>
			<div
				className="hero my-4 md:h-72"
				style={{
					backgroundImage: "url(https://i.ibb.co/yBK73fSV/politics.jpg)",
				}}
			>
				<div className="hero-overlay"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="">
						<h1 className="mb-5 text-5xl font-bold">Welcome to Hikmah Blog</h1>
						<p className="mb-5">
							Get your right place to express yourself. Make opinion and read
							other's opinion on topics you charish.
						</p>
						<Link to={"/allBlogs"}>
							<button className="btn btn-primary">Get Started</button>
						</Link>
					</div>
				</div>
				{/* home card */}
			</div>
			<HomeCard></HomeCard>
		</>
	);
};

export default Home;
