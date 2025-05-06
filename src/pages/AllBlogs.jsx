import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllBlogCard from "../component/AllBlogCard";
import useTitle from "../utils/useTitle";

const AllBlogs = () => {
	useTitle("All Blogs");
	const blogs = useLoaderData();
	const [searchedBlogs, setSearchedBlogs] = useState(blogs);
	const handleSearchByTitle = (e) => {
		e.preventDefault();
		const searchByTitleText = e.target.searchByTitleText.value.trim();
		console.log(searchByTitleText);
		axios
			.get(`http://localhost:5001/blogs-by-search?title=${searchByTitleText}`)
			.then((res) => setSearchedBlogs(res.data));
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
				<div className="card bg-neutral/50 text-neutral-content mt-32  ">
					<div className="card-body items-center text-center">
						<h2 className="card-title">Cookies!</h2>
						<p>We are using cookies for no reason.</p>
					</div>
				</div>
			) : (
				<>
					{searchedBlogs.map((blog, index) => (
						<AllBlogCard key={blog._id} blog={blog} index={index}></AllBlogCard>
					))}
				</>
			)}
		</div>
	);
};

export default AllBlogs;
