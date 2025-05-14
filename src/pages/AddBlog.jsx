import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../utils/useTitle";
const AddBlog = () => {
	useTitle("Add Blog");
	const { user } = useContext(AuthContext);
	const userName = user.displayName;
	const email = user.email;
	const addBlogHandler = (e) => {
		e.preventDefault();
		const title = e.target.blogTitle.value;
		const image = e.target.imageURL.value;

		const category = e.target.category.value;
		const shortDescription = e.target.shortDescription.value;
		const blogPost = e.target.blogPost.value;

		const addedBlogPost = {
			title,
			image,
			category,
			shortDescription,
			blogPost,
			userName,
			email,
		};

		/* fetch("https://server-side-bres9-a10.onrender.com/addReview", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(addedBlogPost),
		}) */
		axios
			.post("https://hikmah-server.vercel.app/addBlog", addedBlogPost)

			.then((data) => {
				if (data.data.insertedId) {
					Swal.fire({
						title: "Success!",
						text: "Your Blog is added successfully",
						icon: "success",
						confirmButtonText: "Ok",
					});
				} else {
					Swal.fire({
						title: "Failed",
						text: "Your Blog is not added, please try again",
						icon: "warning",
						confirmButtonText: "Ok",
					});
				}
			});

		e.target.reset();
	};

	return (
		<div>
			<h1 className="text-4xl font-semibold text-accent mt-8 text-center">
				Your Awsome Blog is Just a Second Away
			</h1>
			<h3 className="text-xl font-medium text-center">
				Please Post Your Blog Below:
			</h3>
			<form
				onSubmit={addBlogHandler}
				className="w-11/12  mx-auto mt-12 bg-accent/10 mb-8 rounded-2xl"
			>
				<div className=" flex justify-center">
					<fieldset className="fieldset flex flex-col justify-center items-center rounded-box w-9/12 border-t-2 p-4 ">
						<legend className="fieldset-legend">Post Your Blog</legend>

						<div className="form-control w-full ">
							<label className="label">Blog Title</label>
							<input
								type="text"
								className="input w-full"
								placeholder="Blog Title"
								name="blogTitle"
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">Image for the Blog</label>
							<input
								type="text"
								className="input w-full"
								placeholder="Please Give Image URL"
								name="imageURL"
							/>
						</div>

						<div className="form-control w-full">
							<label className="label">Blog Category</label>
							<select
								defaultValue="Pick a Category"
								className="select w-full  justify-center"
								name="category"
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
							></textarea>
						</div>
						<div className="form-control w-full">
							<label className="label">Write Your Blog</label>
							<textarea
								placeholder="Write your Blog..."
								className="textarea w-full h-56"
								name="blogPost"
							></textarea>
						</div>
						<div className="form-control w-full mt-8">
							<label className="label">User who is submitting this Blog</label>
							<input
								type="text"
								className="input w-full text-red-800 bg-amber-600/20"
								defaultValue={userName}
								readOnly
							/>
						</div>

						<div className="form-control w-full">
							<label className="label">Email of the user</label>
							<input
								type="text"
								className="input w-full text-red-800 bg-amber-600/20"
								defaultValue={email}
								readOnly
							/>
						</div>
					</fieldset>
					{/* <label className="label">User Name</label>
						<input
							type="text"
							className="input"
							value={user.displayName}
							readOnly
						/>

						<label className="label">Email</label>
						<input type="text" className="input" value={user.email} readOnly /> */}
				</div>
				<div className="flex justify-center py-8 mx-5">
					<button className="btn w-9/12">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddBlog;
