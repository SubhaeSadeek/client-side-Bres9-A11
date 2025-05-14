import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyBlogCard = ({ myBlog, myBlogs, setMyBlogs }) => {
	const { image, title, category, _id } = myBlog;
	const navigate = useNavigate();
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete wishlist!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`https://hikmah-server.vercel.app/my-blog/${id}`)

					.then((res) => {
						if (res.data.deletedCount) {
							Swal.fire({
								title: "Deleted!",
								text: "Your Review has been deleted.",
								icon: "success",
							});
							const remainingMyBlogs = myBlogs.filter((blog) => blog._id != id);
							setMyBlogs(remainingMyBlogs);
						}
					});
			}
		});
	};
	const handleDetailBlog = (id) => {
		navigate(`/blogDetails/${id}`);
	};
	return (
		<>
			<tr className="hover:bg-base-300 text-blue-700 font-semibold">
				<td>
					<img
						className="w-20 h-20 m-0 p-0"
						src={image}
						alt={`image of blog ${title}`}
					/>
				</td>
				<td className="text-blue-700">{title}</td>
				<td className="text-blue-700">{category}</td>
				<td>
					<button
						onClick={() => handleDetailBlog(_id)}
						className="btn bg-blue-400"
					>
						Detail
					</button>
					<button
						className="btn bg-red-600 ml-2"
						onClick={() => handleDelete(_id)}
					>
						Delete
					</button>
				</td>
			</tr>
		</>
	);
};

export default MyBlogCard;
