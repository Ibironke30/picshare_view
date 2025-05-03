import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import AuthContext from "../../store/context/authContext";

export default function LoginForm() {
	const atx = useContext(AuthContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		atx.onLogIn(e); // Pass event to context handler
	};

	return (
		<form className={styles.form} onSubmit={handleLogin}>
			<h2>Sign in to your account</h2>

			{atx.error && <div className={styles.error}>{atx.error}</div>}

			<div className={styles.form_controls}>
				<div className={styles.form_control}>
					<input
						type="text"
						placeholder="Email or username"
						ref={atx.loginUserInputRef}
						onChange={atx.loginUserHandler}
						onBlur={atx.validateLoginUserHandler}
						className={
							atx.invalidInput && !atx.loginUserIsValid ? styles.invalid : ""
						}
					/>
				</div>

				<div className={styles.form_control}>
					<input
						type="password"
						placeholder="Password"
						ref={atx.passwordInputRef}
						onChange={atx.loginPasswordHandler}
						onBlur={atx.validateLoginPasswordHandler}
						className={
							atx.invalidInput && !atx.loginPasswordIsValid
								? styles.invalid
								: ""
						}
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={!atx.loginUserIsValid || !atx.loginPasswordIsValid}
			>
				Login
			</button>

			<div className={styles.message}>
				<Link to="/register">Join PicShare</Link>
			</div>
		</form>
	);
}
