import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Layout = () => {
	return (
		<div className="container mx-auto">
			<div>
				<Toaster></Toaster>
			</div>
			{/* navbar  */}
			<Navbar></Navbar>
			{/* main */}
			<div className="min-h-dvh">
				<Outlet></Outlet>
			</div>
			{/* footer */}
			<Footer></Footer>
		</div>
	);
};

export default Layout;
