import { createBrowserRouter } from "react-router-dom";
import Error from "../component/Error";
import Layout from "../layout/Layout";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlog from "../pages/FeaturedBlog";
import Home from "../pages/Home";
import MyBlogs from "../pages/MyBlogs";
import WishList from "../pages/WishList";

const Routers = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		errorElement: <Error></Error>,
		children: [
			{
				path: "",
				element: <Home></Home>,
			},
			{
				path: "/allBlogs",
				element: <AllBlogs></AllBlogs>,
			},
			{
				path: "/addBlogs",
				element: <AddBlog></AddBlog>,
			},
			{
				path: "/featuredBlogs",
				element: <FeaturedBlog></FeaturedBlog>,
			},
			{
				path: "/myBlogs",
				element: <MyBlogs></MyBlogs>,
			},
			{
				path: "/wishList",
				element: <WishList></WishList>,
			},
		],
	},
]);
export default Routers;
