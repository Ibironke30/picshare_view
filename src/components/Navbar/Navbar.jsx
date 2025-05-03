import React, { useContext } from "react";
import AuthContext from "../../store/context/authContext";
import styles from "./Navbar.module.css";

const logoUrl = "/vite.svg";

export default function Navbar() {
	const atx = useContext(AuthContext);
	return (
		<nav className={styles.container}>
			<div className={styles.logo}>
				<img src={logoUrl} alt="PicShare Logo" />
				<span>PicShare</span>
			</div>
			{atx.isUser && (
				<div className="flex gap-4">
					<span className="text-gray-700">Hi, {atx.isUser.username}</span>
				</div>
			)}
		</nav>
	);
}
