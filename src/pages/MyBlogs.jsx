import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MyBlogCard from "../component/MyBlogCard";
import { AuthContext } from "../provider/AuthProvider";

const MyBlogs = () => {
	const { user } = useContext(AuthContext);
	const [myBlogs, setMyBlogs] = useState([]);
	useEffect(() => {
		if (user?.email) {
			axios
				.post("http://localhost:5001/myblogs", { email: user.email })
				.then((res) => {
					setMyBlogs(res.data);
				})
				.catch(console.error);
		}
	}, [user?.email]); // Only run when user.email changes

	return (
		<div>
			<div>
				<h1 className="text-center text-4xl font-bold text-fuchsia-600 mt-8">
					My Blog Contribution Total -
					<span className="text-blue-600">{myBlogs.length}</span>
				</h1>
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th>Title</th>
								<th>Category</th>
							</tr>
						</thead>
						<tbody>
							{/* row */}
							{myBlogs.map((myBlog) => (
								<MyBlogCard
									key={myBlog._id}
									myBlog={myBlog}
									myBlogs={myBlogs}
									setMyBlogs={setMyBlogs}
								></MyBlogCard>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MyBlogs;
