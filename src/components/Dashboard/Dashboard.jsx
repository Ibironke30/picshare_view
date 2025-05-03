import React, { useContext, useEffect } from "react";
import PhotoCard from "./Components/PhotoCard";
import styles from "./Dashboard.module.css";
import GalleryContext from "../../store/context/galleryContext";
import AuthContext from "../../store/context/authContext";
import ImageUploader from "./Components/ImageUploader";
import Photos from "./Components/Photos";

const API = "http://localhost:5000";

export default function Dashboard() {
	const atx = useContext(AuthContext);

	return (
		<div className={styles.container}>
			{atx.isUser.role === "creator" && <ImageUploader />}
			{atx.isUser.role === "consumer" && <Photos />}
		</div>
	);
}
