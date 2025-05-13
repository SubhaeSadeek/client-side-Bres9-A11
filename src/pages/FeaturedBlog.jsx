import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedBlogCard from "../component/FeaturedBlogCard";

const FeaturedBlog = () => {
	const [featuredBlogs, setFeatuedBlogs] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:5001/featured")
			.then((res) => setFeatuedBlogs(res.data));
	}, []);
	return (
		<div>
			{featuredBlogs.map((blog) => (
				<FeaturedBlogCard key={blog._id} blog={blog}></FeaturedBlogCard>
			))}
		</div>
	);
};

export default FeaturedBlog;
