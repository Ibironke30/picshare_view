import React, { useContext } from "react";
import AuthContext from "../../store/context/authContext";
import styles from "./Navbar.module.css";
import GalleryContext from "../../store/context/galleryContext";

const logoUrl = "/vite.svg";

export default function Navbar() {
	const atx = useContext(AuthContext);
	const gtx = useContext(GalleryContext);

	return (
		<nav className={styles.container}>
			<div className={styles.logo}>
				<img src={logoUrl} alt="PicShare Logo" />
				<span>PicShare</span>
			</div>
			{atx.isUser && (
				<div className={styles.user}>
					<span className="text-gray-700">Hi, {atx.isUser.username}</span>
					<i
						className="fa-solid fa-right-from-bracket"
						onClick={atx.onLogOut}
					></i>
				</div>
			)}
			{/* <div className={styles.logout}></div> */}
		</nav>
	);
}
