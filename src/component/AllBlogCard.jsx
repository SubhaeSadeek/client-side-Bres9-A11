import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const AllBlogCard = ({ blog, index }) => {
	const { title, image, shortDescription, category, userName, email } = blog;
	const { user } = useContext(AuthContext);
	return (
		<div>
			<div className="hero bg-base-200 my-8">
				<div
					className={`hero-content flex-col ${
						index % 2 === 0 ? "lg:flex-row" : "md:flex-row-reverse"
					}`}
				>
					<img src={image} className="w-[50%] rounded-lg" />
					<div>
						<h1 className="text-2xl font-bold text-fuchsia-00">{title}</h1>
						<p className="">{shortDescription}</p>
						<p className="">{category}</p>
						<p className="">{userName}</p>
						<p className="">{email}</p>
						<div className="flex gap-8">
							<button className="btn btn-primary" disabled={!user}>
								Wishlist
							</button>
							<button className="btn btn-accent">Details</button>
						</div>
						<div className="flex justify-around bg"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllBlogCard;
