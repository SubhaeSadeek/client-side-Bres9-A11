import { useContext } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const BlogDetails = () => {
	const blog = useLoaderData();
	const { title, image, blogPost, category, userName, email, _id } = blog;
	const { user } = useContext(AuthContext);

	return (
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
						className="rounded-xl"
					/>
				</figure>
				<div className="card-body items-center">
					<p>{blogPost}</p>
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
			<div className=" flex justify-center my-8">
				{user && user.email === email && (
					<NavLink to={`/updateBlog/${_id}`}>
						{" "}
						<button className="btn btn-accent">
							Hello {userName}! Update Your Blog
						</button>
					</NavLink>
				)}
			</div>
		</div>
	);
};

export default BlogDetails;
