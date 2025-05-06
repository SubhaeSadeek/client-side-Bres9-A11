import { useLoaderData } from "react-router-dom";

const BlogDetails = () => {
	const blog = useLoaderData();
	const {
		title,
		image,
		shortDescription,
		blogPost,
		category,
		userName,
		email,
		_id,
	} = blog;

	return (
		<div>
			<div className="card bg-base-300 shadow-sm">
				<h2 className="text-2xl text-center mt-8 font-semibold">{title}</h2>
				<figure className="px-4 pt-4">
					<img
						src={image}
						alt={`image showing cover of ${title}`}
						className="rounded-xl"
					/>
				</figure>
				<div className="card-body items-center">
					<p> {shortDescription}</p>
					<p>{blogPost}</p>
					<p>rating: {category}</p>
				</div>
			</div>
			<div className=" bg-accent/50 flex flex-col md:flex-row justify-around mb-4 py-2 font-semibold">
				<p>
					Blogger: <span className="text-amber-900">{userName}</span>{" "}
				</p>
				<p>
					Bloggers's Email: <span className="text-amber-900">{email}</span>
				</p>
			</div>
		</div>
	);
};

export default BlogDetails;
