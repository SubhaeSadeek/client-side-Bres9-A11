import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	useEffect(() => {
		if (!loading && !user) {
			toast.success("Oops! Please log in first", {
				style: {
					border: "1px solid #713200",
					padding: "16px",
					color: "#713200",
				},
				iconTheme: {
					primary: "#713200",
					secondary: "#FFFAEE",
				},
			});
		}
	}, [loading, user]);

	if (loading) {
		return <span className="loading loading-bars loading-lg"></span>;
	}

	if (!user) {
		return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.any,
};

export default PrivateRoute;
