import React, { useContext, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Dashboard from "./components/Dashboard/Dashboard";
import UploadForm from "./components/Dashboard/Components/ImageUploader";
import PhotoDetail from "./components/PhotoDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthContext from "./store/context/authContext";

const App = () => {
	const atx = useContext(AuthContext);

	useEffect(() => {
		atx.onVerify();
	}, [atx.isLoggedIn]);

	console.log(atx.isLoggedIn);
	return (
		<div className="max-w-5xl mx-auto p-4 h-8">
			<Routes>
				<Route
					path="/login"
					element={
						!atx.isLoggedIn ? (
							<AuthLayout type="Login">
								<LoginForm />
							</AuthLayout>
						) : (
							<Navigate to="/dashboard" replace />
						)
					}
				/>
				<Route
					path="/register"
					element={
						!atx.isLoggedIn ? (
							<AuthLayout type="Register">
								<RegisterForm />
							</AuthLayout>
						) : (
							<Navigate to="/dashboard" replace />
						)
					}
				/>

				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				{/* Catch-all */}
				<Route
					path="*"
					element={<Navigate to={atx.isLoggedIn ? "/dashboard" : "/login"} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
