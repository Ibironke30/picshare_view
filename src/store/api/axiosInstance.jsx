import axios from "axios";

// Use environment variable for base URL (recommended)
const axiosInstance = axios.create({
	baseURL:
		import.meta.env.VITE_API_BASE_URL || "http://localhost:8001/picshare/api",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

// Request interceptor (e.g., attach token)
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("userToken");
		if (token) config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	(error) => {
		console.log(error);
		Promise.reject(error);
	}
);

// Response interceptor (handle errors globally)
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Optionally handle unauthorized globally
			// e.g., logout user, redirect, etc.
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
