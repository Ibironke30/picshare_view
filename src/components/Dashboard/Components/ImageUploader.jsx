import React, { useContext } from "react";
import GalleryContext from "../../../store/context/galleryContext";
import styles from "../Dashboard.module.css";

const ImageUploader = () => {
	const {
		fileHandler,
		inputHandler,
		onUploadImage,
		isSelectedFile,
		isPreview,
		isUploadForm,
		isUploading,
		error,
	} = useContext(GalleryContext);

	return (
		<div className={styles.uploader}>
			<h2>Image Uploader</h2>
			<form onSubmit={onUploadImage}>
				<div
					className={styles.uploadSection}
					onClick={() =>
						!isUploading && document.getElementById("fileInput").click()
					}
				>
					<input
						id="fileInput"
						type="file"
						accept="image/*"
						onChange={fileHandler}
						disabled={isUploading}
						className={styles.hiddenInput}
					/>

					{isPreview && (
						<div className={styles.previewContainer}>
							<img
								src={isPreview}
								alt="Preview"
								className={styles.previewImage}
							/>
							<div className={styles.previewOverlay} />
						</div>
					)}

					<button
						type="button"
						className={styles.uploadButton}
						disabled={isUploading}
						onClick={isUploading ? (e) => e.stopPropagation() : null}
					>
						{isPreview ? "Change Image" : "Choose Photo"}
					</button>
				</div>
				<div className={styles.form_controls}>
					<div className={styles.form_control}>
						<input
							type="text"
							name="title"
							placeholder="Title"
							value={isUploadForm.title || ""}
							onChange={inputHandler}
							required
						/>
					</div>

					<div className={styles.form_control}>
						<input
							type="text"
							name="caption"
							placeholder="Caption"
							value={isUploadForm.caption}
							onChange={inputHandler}
						/>
					</div>

					<div className={styles.form_control}>
						<input
							type="text"
							name="location"
							placeholder="Location"
							value={isUploadForm.location}
							onChange={inputHandler}
						/>
					</div>

					<button type="submit" disabled={isUploading}>
						{isUploading ? "Uploading..." : "Upload Image"}
					</button>

					{error && <span className={styles.errorMessage}>{error}</span>}
				</div>
			</form>
		</div>
	);
};

export default ImageUploader;
