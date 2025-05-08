import React, { useContext, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Dashboard.module.css";
import AuthContext from "../../../store/context/authContext";
import GalleryContext from "../../../store/context/galleryContext";
import CommentSection from "./CommentSection";

const PhotoCard = memo(function PhotoCard({ photo, user }) {
	const { likePhoto, showPhoto } = useContext(GalleryContext);

	return (
		<div className={styles.photoCard}>
			<img
				src={photo.url}
				alt={photo.title}
				onClick={() => showPhoto(photo._id)}
			/>
			<span className={styles.photoTitle}>{photo.title}</span>
			<button
				className={`${styles.likeBtn} ${photo.liked ? styles.liked : ""}`}
				onClick={() => likePhoto(photo._id)}
			>
				<i className="fa-solid fa-heart"></i>
			</button>
		</div>
	);
});

export default PhotoCard;
