import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const WishListCard = ({ wishlistB, wishlistBlog, setWishListBlog }) => {
	const { title, shortDescription, image, category, blogger, blogId, _id } =
		wishlistB;

	const handleMyWishListDelete = (id) => {
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
					.delete(`https://hikmah-server.vercel.app/wishlist/${id}`)

					.then((res) => {
						if (res.data.deletedCount) {
							Swal.fire({
								title: "Deleted!",
								text: "Your Review has been deleted.",
								icon: "success",
							});
							const remainingMyWishlist = wishlistBlog.filter(
								(blog) => blog._id != id
							);
							setWishListBlog(remainingMyWishlist);
						}
					});
			}
		});
	};
	return (
		<div className="card card-side bg-accent/20  mt-4">
			<figure>
				<img src={image} alt={title} />
			</figure>

			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{shortDescription}</p>
				<p className="text-lg font-bold text-black/40">Category: {category}</p>
				<p className="text-lg font-bold text-black/40">Blogger: {blogger}</p>
				<div className="card-actions justify-end">
					<NavLink to={`/blogDetails/${blogId}`}>
						<button className="btn btn-accent">Details</button>
					</NavLink>
					<button
						onClick={() => handleMyWishListDelete(_id)}
						className="btn btn-primary"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default WishListCard;
