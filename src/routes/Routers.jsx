import { createBrowserRouter } from "react-router-dom";
import BlogDetails from "../component/BlogDetails";
import Error from "../component/Error";
import Layout from "../layout/Layout";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlog from "../pages/FeaturedBlog";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBlogs from "../pages/MyBlogs";
import Register from "../pages/Register";
import WishList from "../pages/WishList";
import PrivateRoute from "./PrivateRoute";

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
				loader: () => fetch("http://localhost:5001/allBlogs"),
			},
			{
				path: "/blogDetails/:id",
				element: <BlogDetails></BlogDetails>,
				loader: ({ params }) =>
					fetch(`http://localhost:5001/blogDetails/${params.id}`),
			},
			{
				path: "/addBlogs",
				element: (
					<PrivateRoute>
						<AddBlog></AddBlog>
					</PrivateRoute>
				),
			},
			{
				path: "/featuredBlogs",
				element: <FeaturedBlog></FeaturedBlog>,
			},
			{
				path: "/myBlogs",
				element: (
					<PrivateRoute>
						<MyBlogs></MyBlogs>
					</PrivateRoute>
				),
			},
			{
				path: "/wishList",
				element: (
					<PrivateRoute>
						<WishList></WishList>
					</PrivateRoute>
				),
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
		],
	},
]);
export default Routers;
