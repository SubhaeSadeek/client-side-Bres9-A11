import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const LIMIT = 4;
const HomeCard = () => {
	const [blogs, setBlogs] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalBlogs, setTotalBlogs] = useState(0);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`https://hikmah-server.vercel.app/home-card?page=${page}&limit=${LIMIT}`
				);
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data = await res.json();
				setTotalBlogs(data.total);
				if (page === 1) {
					setBlogs(data.blogs);
				} else {
					setBlogs((prev) => [...prev, ...data.blogs]);
				}
				setTotalPages(data.totalPages);
			} catch (err) {
				console.log("error on fetching limited blogs", err);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, [page]);

	const handleMoreReviews = () => {
		page < totalPages && setPage((prev) => prev + 1);
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2	gap-4 w-11/12 mx-auto my-12 ">
				{blogs.map((blog) => (
					<div className="card bg-base-300 shadow-sm" key={blog?._id}>
						<figure className="px-4 pt-4">
							<img
								src={blog?.image}
								alt={`image showing cover of ${blog?.title}`}
								className="rounded-xl"
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className="card-title">{blog?.title}</h2>
							<p> {blog?.shortDescription}</p>
							<p className="text-xl font-semibold text-amber-900/50">
								Category: {blog?.category}
							</p>
						</div>
						<div className="card-actions justify-center mb-4">
							<NavLink to={"/allBlogs"}>
								<button className="btn btn-info">See all blogs</button>
							</NavLink>
						</div>
					</div>
				))}
			</div>

			{page < totalPages && (
				<div className="card-actions justify-center">
					<button
						className="btn btn-accent my-4"
						onClick={handleMoreReviews}
						disabled={loading}
					>
						{loading ? "Loading..." : "Load More"}
					</button>
				</div>
			)}
			<div className="w-1/2 mx-auto flex flex-col md:flex-row justify-between md:gap-12 text-sm text-black/70 mb-4 border-t-2 border-fuchsia-200 ">
				<p>
					Showing review{" "}
					<span className="font-bold text-fuchsia-900">{blogs.length}</span> of{" "}
					{totalBlogs}
				</p>
				<p>
					Currently on page{" "}
					<span className="font-black text-fuchsia-900">{page}</span> of{" "}
					{totalPages}
				</p>
			</div>
		</div>
	);
};

export default HomeCard;
