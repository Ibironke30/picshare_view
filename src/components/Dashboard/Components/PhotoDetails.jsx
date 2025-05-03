import React, { useContext, useState } from "react";
import styles from "../Dashboard.module.css";
import GalleryContext from "../../../store/context/galleryContext";

export default function PhotoDetail({ open, onClose }) {
	const gtx = useContext(GalleryContext);
	const [current, setCurrent] = useState(gtx.photoIndex);
	if (!gtx.photo) return null;

	const prev = () => setCurrent((c) => (c <= 0 ? c : c - 1));
	const next = () =>
		setCurrent((c) => (c >= gtx.photos.length - 1 ? 0 : c + 1));

	return (
		<>
			<div className={styles.photoDetail}>
				<div className={styles.detailBtns}>
					<button onClick={prev}>
						<i class="fa-solid fa-chevron-left"></i>
					</button>
				</div>

				<div className={styles.detailCard}>
					<div className={styles.details}>
						<h3 className={styles.detailTitle}>{gtx.photos[current]?.title}</h3>
						<span className={styles.detailLikes}>
							<i className="fa-solid fa-heart"></i> Likes{" "}
							{gtx.photos[current]?.likeCount}
						</span>
					</div>
					<img
						src={gtx.photos[current]?.url}
						alt={gtx.photos[current]?.caption}
					/>
					<div className={styles.detailCaption}>
						<div>
							<i className="fa-solid fa-closed-captioning"></i>{" "}
							{gtx.photos[current]?.caption}
						</div>
						<div>
							<i className="fa-solid fa-globe"></i>{" "}
							{gtx.photos[current]?.location}
						</div>
					</div>
				</div>

				<div className={styles.detailBtns}>
					<button onClick={next}>
						<i class="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</div>
			{/* Close button outside modal/carousel */}
			<button
				className={styles.detailClose}
				onClick={() => gtx.showPhoto(null)}
				aria-label="Close modal"
			>
				&times;
			</button>
		</>
	);
}
