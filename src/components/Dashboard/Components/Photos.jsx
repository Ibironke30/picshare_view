import React, { useState, useEffect, useContext } from "react";
import PhotoCard from "./PhotoCard";
import AuthContext from "../../../store/context/authContext";
import GalleryContext from "../../../store/context/galleryContext";
import styles from "../Dashboard.module.css";
import PhotoDetails from "./PhotoDetails";

export default function Photos({ user }) {
	const atx = useContext(AuthContext);
	const gtx = useContext(GalleryContext);

	useEffect(() => {
		gtx.getPhotos();
		gtx.showPhoto(null);
	}, []);

	console.log(gtx.photos);
	return (
		<div>
			{gtx.isShowing ? <PhotoDetails /> : null}
			<h2 className="text-2xl font-bold mb-4 text-center">My Photos</h2>
			<div className={styles.photoGrid}>
				{gtx.photos.map((p, i) => (
					<PhotoCard key={i} photo={p} />
				))}
			</div>
		</div>
	);
}
