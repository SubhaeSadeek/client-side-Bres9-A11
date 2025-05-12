import axios from "axios";
import { useContext, useEffect, useState } from "react";
import WishListCard from "../component/WishListCard";
import { AuthContext } from "../provider/AuthProvider";

const WishList = () => {
	const [wishlistBlog, setWishListBlog] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user?.email) {
			axios
				.post("http://localhost:5001/get-wishlist/", { email: user.email })
				.then((res) => {
					setWishListBlog(res.data || []);
				})
				.catch(console.error);
		}
	}, [user?.email]); // <- Important: prevents infinite requests

	return (
		<div>
			<h3 className="text-2xl font-semibold text-blue-700 text-center mt-4">
				Total wishlist you saved: {wishlistBlog.length}
			</h3>
			{wishlistBlog.map((wishlistB) => (
				<WishListCard
					key={wishlistB._id}
					wishlistB={wishlistB}
					wishlistBlog={wishlistBlog}
					setWishListBlog={setWishListBlog}
				/>
			))}
		</div>
	);
};

export default WishList;
