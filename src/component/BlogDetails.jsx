import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const BlogDetails = () => {
	const blog = useLoaderData();
	const [showComments, setShowComments] = useState([]);
	const { title, image, blogPost, category, userName, email, _id } = blog;
	const { user } = useContext(AuthContext);
	// comment data fetche and display comments
	useEffect(() => {
		if (!_id) return;
		axios
			.get(`https://hikmah-server.vercel.app/show-comments/${_id}`)
			.then((res) => {
				const sortedComments = res.data.sort(
					(a, b) => new Date(b.commentAt) - new Date(a.commentAt)
				);
				setShowComments(sortedComments);
			})
			.catch((err) => {
				console.error("Failed to load comments:", err);
			});
	}, [_id]);
	console.log(showComments);
	// post comment handler
	const handleComment = (e) => {
		e.preventDefault();

		const comment = e.target.comment.value;
		const commentor = user?.displayName;
		const commentorImage = user?.photoURL;
		const commentorEmail = user?.email;
		const commentForBlogId = _id;
		const commentBlogTitle = title;
		const commentAt = new Date();
		const commentData = {
			comment,
			commentor,
			commentorEmail,
			commentorImage,
			commentForBlogId,
			commentBlogTitle,
			commentAt,
		};

		axios
			.post("https://hikmah-server.vercel.app/comment", commentData)
			.then((res) => {
				if (res.data.insertedId) {
					Swal.fire({
						title: "Success!",
						text: "Your comment is added successfully",
						icon: "success",
						confirmButtonText: "Ok",
					});
				} else {
					Swal.fire({
						title: "Failed",
						text: "Your Comment is not added, please try again",
						icon: "warning",
						confirmButtonText: "Ok",
					});
				}
			});
		e.target.reset();
	};

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
			{/* comment section */}
			<h3 className="text-xl font-semibold border-b-2">Comment section</h3>
			{/* all comments are shown for this id */}
			{showComments.map((comment) => (
				<div
					className="card bg-base-100 w-2/3 mx-auto shadow-sm "
					key={comment._id}
				>
					<div className="card-body">
						<div className="flex gap-2">
							<img src={comment.commentorImage} className="w-16 rounded-full" />
							<h2 className="card-title">{comment.commentor}</h2>
						</div>
						<p className="text-lg text-fuchsia-900">{comment.comment}</p>
						<p className="text-xs text-fuchsia-900">{comment.commentAt}</p>
					</div>
				</div>
			))}

			<div>
				{user ? (
					<form onSubmit={handleComment}>
						<div className="form-control w-2/3 mx-auto ">
							<label className="label">Put your comment here</label>
							<textarea
								placeholder="Your comments..."
								className="textarea w-full border-2 border-amber-700 rounded-b-md"
								name="comment"
							></textarea>
						</div>
						<div className=" w-1/6 flex justify-center mx-auto p-2 rounded-md bg-accent cursor-pointer my-4 hover:bg-blue-400">
							<input
								type="submit"
								value="Submit Comment"
								className="cursor-pointer"
							/>
						</div>
					</form>
				) : (
					<p className="text-center text-red-500">
						Please{" "}
						<NavLink to="/login" className="underline text-blue-700">
							log in
						</NavLink>{" "}
						to comment.
					</p>
				)}
			</div>
		</div>
	);
};

export default BlogDetails;
