import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import Routers from "./routes/Routers.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={Routers}></RouterProvider>
		</AuthProvider>
	</StrictMode>
);
