import React, { useContext, useState } from "react";
import GalleryContext from "../../../store/context/galleryContext";
import styles from "../Dashboard.module.css";

const CommentSection = ({ id }) => {
	const [comments, setComments] = useState([]);
	const [commentInput, setCommentInput] = useState("");
	const gtx = useContext(GalleryContext);

	const postComment = (e) => {
		e.preventDefault();
		gtx.addComment(id);
	};

	const handleDeleteComment = (id) => {
		setComments(comments.filter((comment) => comment.id !== id));
	};

	return (
		<div className={styles.comments}>
			<h2>Comments</h2>
			<ul>
				{gtx.comments.length !== 0 ? (
					gtx.comments.map((comment) => (
						<li key={comment._id}>
							<span>{comment.comment}</span>
							<button onClick={() => handleDeleteComment(comment._id)}>
								<i className="fa-solid fa-trash"></i>
							</button>
						</li>
					))
				) : (
					<p>No comments yet.</p>
				)}
			</ul>
			<form onSubmit={postComment}>
				<input
					type="text"
					value={gtx.comment}
					onChange={gtx.handleCommentInput}
					placeholder="Write a comment..."
				/>
				<button type="submit">Post</button>
			</form>
		</div>
	);
};

export default CommentSection;
