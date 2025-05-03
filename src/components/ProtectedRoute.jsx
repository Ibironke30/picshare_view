import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useContext } from "react";
import AuthContext from "../store/context/authContext";

export default function ProtectedRoute({}) {
	const atx = useContext(AuthContext);
	console.log(atx.isLoggedIn);
	return atx.isLoggedIn ? (
		<>
			<Navbar />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" replace />
	);
}
