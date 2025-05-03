import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/context/authContext";

export default function RegisterForm() {
	const {
		onSignUp,
		firstNameHandler,
		lastNameHandler,
		emailHandler,
		passwordHandler,
		usernameHandler,
		roleHandler,
		signUpData,
		error,
		invalidInput,
	} = useContext(AuthContext);

	// You can use useNavigate if you want to manually redirect on success,
	// but the context's onSignUp may already handle redirect.

	const isCreator = signUpData.role === "creator";

	return (
		<form className={styles.form} onSubmit={onSignUp}>
			<h2>Register Today!</h2>
			<div className={styles.form_controls}>
				<div className={styles.form_control}>
					<input
						type="text"
						placeholder="First name"
						value={signUpData.firstName || ""}
						onChange={firstNameHandler}
					/>
				</div>
				<div className={styles.form_control}>
					<input
						type="text"
						placeholder="Last name"
						value={signUpData.lastName || ""}
						onChange={lastNameHandler}
					/>
				</div>
				<div className={styles.form_control}>
					<input
						type="text"
						placeholder="Username"
						value={signUpData.username || ""}
						onChange={usernameHandler}
					/>
				</div>
				<div className={styles.form_control}>
					<input
						type="text"
						placeholder="Email"
						value={signUpData.email || ""}
						onChange={emailHandler}
					/>
				</div>
				{/* Add other fields and handlers as needed, e.g. username, phone, etc. */}
				<div className={styles.form_control}>
					<input
						type="password"
						placeholder="Password"
						value={signUpData.password || ""}
						onChange={passwordHandler}
					/>
				</div>
			</div>
			<button>Sign Up</button>
			{error && <div className={styles.error}>{error}</div>}
			{invalidInput && (
				<div className={styles.error}>Please fill all fields correctly.</div>
			)}
			<div className={styles.message}>
				Already got an account? - <Link to="/login">Login</Link>
			</div>
		</form>
	);
}
