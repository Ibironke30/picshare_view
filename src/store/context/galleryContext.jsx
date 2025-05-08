import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const GalleryContext = createContext({
	photo: {},
	photos: [],
	getPhoto: async () => {},
	getPhotos: async () => {},
	likePhoto: async () => {},
	showPhoto: () => {},
	ratePhoto: () => {},
	addComment: () => {},
	deleteComment: () => {},
	getComments: () => {},
	handleCommentInput: () => {},
	comments: [],
	comment: "",
	photoIndex: -1,
	isUploadForm: {},
	isShowing: false,
	onUploadImage: async () => {},
	fileHandler: () => {},
	inputHandler: () => {},
	isUploading: false,
	isPreview: null,
	error: null,
});

export const GalleryContextProvider = ({ children }) => {
	const [photo, setPhoto] = useState(null);
	const [photos, setPhotos] = useState([]);
	const [comments, setComments] = useState([]);
	const [comment, setCommentInput] = useState("");
	const [isShowing, setIsShowing] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(-1);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState(null);
	const [isSelectedFile, setSelectedFile] = useState(null);
	const [isPreview, setPreview] = useState("");
	const [isUploadForm, setUploadForm] = useState({
		title: "",
		caption: "",
		location: "",
	});

	const getComments = async (id) => {
		try {
			const { data } = await axiosInstance.get(`/store/${id}/comments`);

			const comments = data.data;
			setComments(comments);
		} catch (error) {}
	};

	const handleCommentInput = (e) => setCommentInput(e.target.value);

	const addComment = async (id) => {
		console.log(comment.trim().length);
		if (comment.trim().length < 10) return;
		try {
			const { data } = await axiosInstance.post(`/store/${id}/comment`, {
				comment,
			});
			const commented = data.data;
			setComments([...comments, commented]);
			setCommentInput("");
		} catch (error) {}
	};

	const deleteComment = async () => {};

	const getPhoto = (id) => {};

	const getPhotos = async () => {
		try {
			const { data } = await axiosInstance.get("/store/photos");
			const images = data.data;
			if (images) setPhotos(images);
		} catch (error) {
			setError(error.message);
		}
	};

	const ratePhoto = async () => {};

	const likePhoto = async (id) => {
		try {
			const { data } = await axiosInstance.patch(`/store/${id}/like`);

			const { liked, likeCount } = data.data;
			setPhotos((prevPhotos) =>
				prevPhotos.map((p) =>
					p._id === id ? { ...p, liked: !p.liked, likeCount } : p
				)
			);
		} catch (error) {}
	};

	const showPhoto = (id) => {
		const selectedPhoto = photos.findIndex((p) => p._id === id); // Get the index
		if (selectedPhoto !== -1) {
			setPhoto(photos[selectedPhoto]);
			setIsShowing(true);
			setPhotoIndex(selectedPhoto);
		} else {
			setIsShowing(false);
			setPhotoIndex(-1);
		}
	};

	const uploadImage = async (formData) => {
		setIsUploading(true);
		setError(null);
		try {
			const { data } = await axiosInstance.post("/store/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return true;
		} catch (error) {
			setError(error.response?.data?.message || "Image upload failed");
		} finally {
			setIsUploading(false);
		}
	};

	const onUploadImage = async (e) => {
		e.preventDefault();
		if (!isSelectedFile) return;

		const data = new FormData();
		data.append("photo", isSelectedFile);
		data.append("title", isUploadForm.title);
		data.append("caption", isUploadForm.caption);
		data.append("location", isUploadForm.location);

		try {
			await uploadImage(data);
			// Reset form after successful upload
			setSelectedFile(null);
			setPreview("");
			setUploadForm({ title: "", caption: "", location: "" });
		} catch (error) {
			// Error handling is already done in context
		}
	};

	const fileHandler = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const inputHandler = (e) => {
		setUploadForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<GalleryContext.Provider
			value={{
				photo,
				photos,
				getPhoto,
				getPhotos,
				likePhoto,
				showPhoto,
				ratePhoto,
				addComment,
				deleteComment,
				getComments,
				handleCommentInput,
				comments,
				comment,
				isShowing,
				isUploadForm,
				photoIndex,
				onUploadImage,
				fileHandler,
				inputHandler,
				isUploading,
				isPreview,
				error,
			}}
		>
			{children}
		</GalleryContext.Provider>
	);
};

export default GalleryContext;
