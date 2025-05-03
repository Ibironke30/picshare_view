import React from "react";
import styles from "./Auth.module.css";

export default function AuthLayout({ type, children }) {
	console.log(type);
  
	return (
		<div className={styles.container}>
			<img src="/vite.svg" alt="Auth image" />
			<div className={styles.formContainer}>{children}</div>
		</div>
	);
}
