import { useState } from "react";

const FeaturedBlogCard = ({ blog }) => {
	const [toggleShowMore, setToggleShowMore] = useState(false);
	const {
		title,
		image,
		category,
		shortDescription,
		blogPost,
		userName,
		email,
		wordCount,
	} = blog;
	const handleToggleShowMore = () => {
		setToggleShowMore(!toggleShowMore);
	};
	return (
		<div>
			<div>
				<div className="card bg-base-300 shadow-sm">
					<h2 className="text-2xl text-center mt-8 font-semibold">{title}</h2>
					<div className="flex justify-around w-3/5 mx-auto border-t-2 py-2">
						<p>
							Category:{" "}
							<span className="text-amber-900 font-semibold">{category}</span>{" "}
						</p>
						<p>
							Posted by:{" "}
							<span className="text-amber-900 font-semibold">{userName}</span>{" "}
						</p>
					</div>
					<figure className="px-4 pt-4">
						<img
							src={image}
							alt={`image showing cover of ${title}`}
							className=" w-1/2 h-1/3 rounded-xl"
						/>
					</figure>

					{toggleShowMore ? (
						<div className="card-body items-center">
							<p>{blogPost}</p>
						</div>
					) : (
						<div className="card-body items-center">
							<p>{shortDescription}</p>
						</div>
					)}
					<p
						onClick={handleToggleShowMore}
						className=" w-1/6 mx-auto font-semibold underline decoration-2 text-end cursor-pointer mb-2 mr-4 hover:italic"
					>
						{toggleShowMore ? (
							<span className="text-blue-700">Show Less</span>
						) : (
							<span className="text-amber-700">Show More</span>
						)}
					</p>
				</div>
				<div className=" bg-accent/50 flex flex-col md:flex-row justify-around mb-4 py-2 font-semibold">
					<p>
						Blogger: <span className="text-amber-900">{userName}</span>{" "}
					</p>
					<p>
						Bloggers's Email: <span className="text-amber-900">{email}</span>
					</p>
					<p>
						Word Count:{" "}
						<span className="text-fuchsia-900">{wordCount} Words</span>{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default FeaturedBlogCard;
