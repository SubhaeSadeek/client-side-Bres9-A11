import axios from "axios";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const AllBlogCard = ({ blog, index, wishlistBlog }) => {
	const [btnDisable, setBtnDisable] = useState(false);

	const {
		title,
		image,
		shortDescription,
		blogPost,
		category,
		userName,
		email,
		_id,
	} = blog;

	const { user } = useContext(AuthContext);

	// const wishlistUserInfo = { email: user.email, id: _id };
	const wishlistCheck =
		Array.isArray(wishlistBlog) &&
		user?.email &&
		wishlistBlog.some(
			(blog) => blog.blogId === _id && blog.wishListUserEmail === user.email
		);

	const addWishlistHandler = () => {
		const wishListBlog = {
			title,
			image,
			category,
			shortDescription,
			blogPost,
			blogger: userName,
			bloggerEmail: email,
			blogId: _id,
			wishListUser: user.displayName,
			wishListUserEmail: user.email,
			wishlistAddedAt: new Date(),
		};
		axios.post("http://localhost:5001/wishlist", wishListBlog).then((res) => {
			if (res.data.insertedId) {
				Swal.fire({
					title: "Success",
					text: "Wish List added to your Profile",
					icon: "success",
					confirmButtonText: "Ok",
				});
			} else {
				Swal.fire({
					title: "Alert",
					text: "Oppss! wish list did not added!",
					icon: "error",
					confirmButtonText: "Ok",
					confirmButtonColor: "red",
				});
			}
		});
		setBtnDisable(true);
	};
	return (
		<div>
			<div className="hero bg-base-200 my-8">
				<div
					className={`hero-content flex-col ${
						index % 2 === 0 ? "lg:flex-row" : "md:flex-row-reverse"
					}`}
				>
					<img src={image} className="w-[50%] rounded-lg" />
					<div>
						<h1 className="text-2xl font-bold text-fuchsia-00">{title}</h1>
						<p className="">{shortDescription}</p>

						<div className="badge badge-info mb-1 ml-2">
							<p className="">Category:</p>
							{category}
						</div>
						<div className="badge badge-success  mb-1 ml-2">
							Blogger: {userName}
						</div>

						<div className="flex gap-2 mt-6">
							<NavLink to={`/blogDetails/${_id}`}>
								<button className="btn btn-accent">Details</button>
							</NavLink>

							{user?.email === email ? (
								<></>
							) : (
								<button
									onClick={addWishlistHandler}
									className="btn btn-primary"
									disabled={!user || btnDisable || wishlistCheck}
								>
									Wishlist
								</button>
							)}

							{wishlistCheck && (
								<div className="badge bg-black/20">Added to Wishlist</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllBlogCard;
