import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllBlogCard from "../component/AllBlogCard";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../utils/useTitle";

const AllBlogs = () => {
	useTitle("All Blogs");
	const blogs = useLoaderData();
	const [searchedBlogs, setSearchedBlogs] = useState(blogs);
	const [wishlistBlog, setWishListBlog] = useState([]);
	const { loading, user } = useContext(AuthContext);

	useEffect(() => {
		if (loading || !user?.email) return;

		axios
			.post("http://localhost:5001/get-wishlist/", { email: user?.email })
			.then((res) => {
				setWishListBlog(res.data || []);
			})
			.catch(console.error);
	}, [loading, user]);
	if (loading) {
		return (
			<div className="w-1/3 mx-auto flex justify-center">
				<span className="loading loading-bars loading-lg"></span>
			</div>
		);
	}

	const handleSearchByTitle = (e) => {
		e.preventDefault();
		const searchByTitleText = e.target.searchByTitleText.value.trim();
		console.log(searchByTitleText);
		axios
			.get(`http://localhost:5001/blogs-by-search?title=${searchByTitleText}`)
			.then((res) => setSearchedBlogs(res.data));
		e.target.reset();
	};
	const handleSelectByCategory = (e) => {
		e.preventDefault();
		const searchByCategory = e.target.value;
		console.log(searchByCategory);
		axios
			.get(`http://localhost:5001/blogs-by-search?category=${searchByCategory}`)
			.then((res) => setSearchedBlogs(res.data));
	};

	return (
		<div>
			<div className="flex flex-col-reverse md:flex-row justify-around gap-8">
				<form className="w-full">
					{/* select option */}
					<fieldset className="fieldset w-full">
						<legend className="fieldset-legend text-xl text-accent">
							Search by Category
						</legend>
						<select
							defaultValue="Select a Category"
							className="select w-full"
							onChange={handleSelectByCategory}
						>
							<option disabled={true}>Select a Category</option>
							<option>Technology</option>
							<option>Politics</option>
							<option>Health</option>
							<option>Food and Travel</option>
							<option>Spiritual</option>
						</select>
					</fieldset>
				</form>
				<form onSubmit={handleSearchByTitle} className="w-full">
					{/* search  field by text input*/}
					<fieldset className="fieldset  relative">
						<legend className="fieldset-legend text-xl text-accent">
							Search by Title
						</legend>
						<input
							type="text"
							className="input w-full"
							placeholder="Search blog by title..."
							name="searchByTitleText"
						/>
					</fieldset>
					<button className="btn btn-sm bg-accent rounded-sm absolute top-28 right-8 z-10">
						Search
					</button>
				</form>
			</div>
			{searchedBlogs.length === 0 ? (
				<div className="card bg-fuchsia-200 text-fuchsia-700 mt-32  ">
					<div className="card-body items-center text-center">
						<h2 className="card-title">Ooops! Search Produce no Result</h2>
						<p>Rephrase your search or select option on left</p>
					</div>
				</div>
			) : (
				<>
					{searchedBlogs.map((blog, index) => (
						<AllBlogCard
							key={blog._id}
							blog={blog}
							index={index}
							wishlistBlog={wishlistBlog}
							user={user}
							loading={loading}
						></AllBlogCard>
					))}
				</>
			)}
		</div>
	);
};

export default AllBlogs;
