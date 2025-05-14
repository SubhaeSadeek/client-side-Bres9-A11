import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../utils/useTitle";
const Update = () => {
	useTitle("Update Blog");
	const { user } = useContext(AuthContext);
	const currentBlog = useLoaderData();

	const [title, setTitle] = useState(currentBlog.title);
	const [image, setImage] = useState(currentBlog.image);
	const [shortDescription, setShortDescription] = useState(
		currentBlog.shortDescription
	);
	const [blogPost, setBlogPost] = useState(currentBlog.blogPost);
	const [category, setCategory] = useState(currentBlog.category);

	const { _id } = currentBlog;
	const userName = user.displayName;
	const email = user.email;
	const updateBlogHandler = (e) => {
		e.preventDefault();

		const updatedBlogPost = {
			title,
			image,
			category,
			shortDescription,
			blogPost,
			userName,
			email,
		};

		axios
			.patch(
				`https://hikmah-server.vercel.app/update-blog/${_id}`,
				updatedBlogPost
			)
			.then((res) => {
				if (res.data.modifiedCount > 0) {
					Swal.fire({
						title: "Success!",
						text: "Your Blog has been Updated successfully",
						icon: "success",
						confirmButtonText: "Ok",
					});
				} else {
					Swal.fire({
						title: "Failed",
						text: "Failed To Update, please try again",
						icon: "warning",
						confirmButtonText: "Ok",
					});
				}
			});

		e.target.reset();
	};

	return (
		<div>
			<h1 className="text-xl font-semibold text-accent bg-amber-800 mt-8 text-center w-1/2 mx-auto rounded-4xl">
				Update Your Blog
			</h1>
			{/* current blogs preview jin a card */}
			<div className="card card-dash bg-accent/20  mt-4">
				<h3 className="font-bold text-center text-fuchsia-900">
					Your Current Blog Preview
				</h3>
				<div className="card-body">
					<h2 className="card-title">{title}</h2>
					<p>{shortDescription}</p>
					<p className="text-lg font-bold text-black/40">
						Category: {category}
					</p>
				</div>
			</div>

			{/* Update form for blog update */}
			<form
				onSubmit={updateBlogHandler}
				className="w-11/12  mx-auto mt-12 bg-accent/10 mb-8 rounded-2xl"
			>
				<div className=" flex justify-center">
					<fieldset className="fieldset flex flex-col justify-center items-center rounded-box w-9/12 border-t-2 p-4 ">
						<legend className="fieldset-legend text-xl">Update Here</legend>

						<div className="form-control w-full ">
							<label className="label">Blog Title</label>
							<input
								type="text"
								className="input w-full"
								placeholder="Blog Title"
								name="blogTitle"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">Image for the Blog</label>
							<input
								type="text"
								className="input w-full"
								placeholder="Please Give Image URL"
								name="imageURL"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
						</div>

						<div className="form-control w-full">
							<label className="label">Blog Category</label>
							<select
								defaultValue="Pick a Category"
								className="select w-full  justify-center"
								name="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option disabled={true}>Pick a Category</option>
								<option>Technology</option>
								<option>Politics</option>
								<option>Health</option>
								<option>Food and Travel</option>
								<option>Spiritual</option>
							</select>
						</div>
						<div className="form-control w-full">
							<label className="label">Short Description about Your Blog</label>
							<textarea
								placeholder="Write a short description..."
								className="textarea w-full"
								name="shortDescription"
								value={shortDescription}
								onChange={(e) => setShortDescription(e.target.value)}
							></textarea>
						</div>
						<div className="form-control w-full">
							<label className="label">Write Your Blog</label>
							<textarea
								placeholder="Write your Blog..."
								className="textarea w-full h-56"
								name="blogPost"
								value={blogPost}
								onChange={(e) => setBlogPost(e.target.value)}
							></textarea>
						</div>
						<div className="form-control w-full mt-8">
							<label className="label">User who is submitting this Blog</label>
							<input
								type="text"
								className="input w-full text-red-800 bg-amber-600/20"
								value={userName}
								readOnly
							/>
						</div>

						<div className="form-control w-full">
							<label className="label">Email of the user</label>
							<input
								type="text"
								className="input w-full text-red-800 bg-amber-600/20"
								value={email}
								readOnly
							/>
						</div>
					</fieldset>
				</div>
				<div className="flex justify-center py-8 mx-5">
					<button className="btn w-9/12">Update</button>
				</div>
			</form>
		</div>
	);
};

export default Update;
