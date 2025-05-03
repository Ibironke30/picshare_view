import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import axiosInstance from "../api/axiosInstance";
import WorkerContext from "./workerContext";
import { useNavigate } from "react-router-dom";

// --- Context ---
export const AuthContext = createContext({
	isLoggedIn: false,
	onVerify: () => {},
	error: null,
	invalidInput: null,
	onSignUp: () => {},
	resendOtp: () => {},
	expiryTime: {},
	phoneExt: null,
	inputRefs: {
		firstName: null,
		lastName: null,
		email: null,
		password: null,
		username: null,
	},
	firstNameHandler: () => {},
	lastNameHandler: () => {},
	emailHandler: () => {},
	passwordHandler: () => {},
	usernameHandler: () => {},
	roleHandler: () => {},
	validateFirstNameHandler: () => {},
	validateLastNameHandler: () => {},
	validateEmailHandler: () => {},
	validateUsernameHandler: () => {},
	validatePasswordHandler: () => {},
	signUpData: {},
	firstNameIsValid: null,
	lastNameIsValid: null,
	emailIsValid: null,
	passwordIsValid: null,
	usernameIsValid: null,
	resetSignUpState: () => {},
	onLogIn: () => {},
	onLogOut: () => {},
	onForgotPassword: () => {},
	loginUserInputRef: null,
	passwordInputRef: null,
	loginUserHandler: () => {},
	loginPasswordHandler: () => {},
	validateLoginUserHandler: () => {},
	validateLoginPasswordHandler: () => {},
	loginData: {},
	isUser: {},
	loginUserIsValid: null,
	loginPasswordIsValid: null,
	nextLoginPageHandler: () => {},
	prevLoginPageHandler: () => {},
});

const generalReducer = (state, action) => {
	switch (action.type) {
		case "USER_INPUT":
			return { val: action.val, isValid: action.val.trim().length > 3 };
		case "INPUT_BLUR":
			return { val: action.val, isValid: action.val.trim().length > 3 };
		case "CHECK":
			return { val: action.val.toString(), isValid: action.val !== null };
		case "SELECT":
			return {
				val: action.val,
				isValid: action.val !== 0 && action.val !== null,
			};
		default:
			return { val: "", isValid: null };
	}
};
const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return { val: action.val, isValid: emailRegex.test(action.val.trim()) };
	}
	if (action.type === "INPUT_BLUR") {
		return { val: action.val, isValid: action.val.trim().length > 3 };
	}
	return { val: "", isValid: null };
};
const passwordReducer = (state, action) => {
	const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
	if (action.type === "PASS_INPUT") {
		return { val: action.val, isValid: regex.test(action.val.target.trim()) };
	}
	if (action.type === "CONFIRM_PASS") {
		return {
			val: action.val,
			isValid:
				regex.test(action.val.target.trim()) &&
				action.val.target.trim() === action.val.compare,
		};
	}
	return { val: "", isValid: null };
};
const loginUsereducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		const loginUserRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return { val: action.val, isValid: loginUserRegex.test(action.val.trim()) };
	}
	if (action.type === "INPUT_BLUR") {
		return { val: action.val, isValid: action.val.trim().length > 3 };
	}
	return { val: "", isValid: null };
};
const loginPasswordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { val: action.val, isValid: action.val.trim().length > 5 };
	}
	if (action.type === "INPUT_BLUR") {
		return { val: action.val, isValid: action.val.trim().length >= 5 };
	}
	return { val: "", isValid: null };
};

export const AuthContextProvider = ({ children }) => {
	const wtx = useContext(WorkerContext);
	const navigate = useNavigate();
	// Shared
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isError, setError] = useState(null);
	const [invalidInput, setInvalidInput] = useState(null);

	// SignUp State
	const [signUpPage, setSignUpPage] = useState(0);
	const [expiryTime, setExpiry] = useState({});
	const [phoneExt, setExt] = useState(null);
	const inputRefs = {
		firstName: useRef(null),
		lastName: useRef(null),
		email: useRef(null),
		username: useRef(null),
		password: useRef(null),
	};
	const [signUpData, setSignUpData] = useState({});
	const [firstNameState, dispatchFirstName] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [lastNameState, dispatchLastName] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		val: "",
		isValid: null,
	});
	const [usernameState, dispatchUsername] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		val: "",
		isValid: null,
	});

	const [formIsValid, setFormIsValid] = useState(false);

	const { isValid: firstNameIsValid } = firstNameState;
	const { isValid: lastNameIsValid } = lastNameState;
	const { isValid: emailIsValid } = emailState;
	const { isValid: usernameIsValid } = usernameState;
	const { isValid: passwordIsValid } = passwordState;

	const validations = [
		{ isValid: firstNameIsValid, ref: inputRefs.firstName },
		{ isValid: lastNameIsValid, ref: inputRefs.lastName },
		{ isValid: emailIsValid, ref: inputRefs.email },
		{ isValid: usernameIsValid, ref: inputRefs.username },
		{ isValid: passwordIsValid, ref: inputRefs.password },
	];

	useEffect(() => {
		const indentifier = setTimeout(
			() =>
				setFormIsValid(
					firstNameIsValid &&
						lastNameIsValid &&
						emailIsValid &&
						usernameIsValid &&
						passwordIsValid
				),
			500
		);
		return () => {
			clearTimeout(indentifier);
		};
	}, [
		firstNameIsValid,
		lastNameIsValid,
		emailIsValid,
		usernameIsValid,
		passwordIsValid,
	]);

	const resetSignUpState = () => {
		setSignUpData({});
		setSignUpPage(0);
		setExpiry({});
		clearError();
	};

	const verify = async () => {
		try {
			const { data } = await axiosInstance.get(`/auth/verify`);
			if (!data) {
				localStorage.removeItem("userToken");
				return;
			}

			setIsLoggedIn(true);
			setIsUser(data.data);
		} catch (error) {
			wtx.toggleLoader();
			localStorage.removeItem("userToken");
			if (isLoggedIn) setIsLoggedIn(false);
			throw error;
		}
	};

	const onVerify = async () => {
		if (!localStorage.getItem("userToken")) {
			return;
		} else {
			wtx.toggleLoader();
			try {
				await verify();
				navigate("/dashboard", { replace: true });
			} catch (error) {
				wtx.toggleLoader();
			}
		}
	};

	const signUp = async (signUpData) => {
		try {
			const { data } = await axiosInstance.post(`/auth/register`, signUpData);

			const signup = data.data;

			if (signup) {
				localStorage.setItem("userToken", signup.accessToken);
        setIsUser(signup.user)
				setIsLoggedIn(true);
				return;
			}
		} catch (err) {
			if (err.response.status !== 500) {
				setError(
					err.response?.data?.message ||
						"User registration failed. Please try again."
				);
			}
			return false;
		}
	};

	const onSignUp = async (e) => {
		e.preventDefault();
		clearError();
		wtx.toggleLoader();
		try {
			const signup = await signUp(signUpData);
			if (signup) {
				wtx.toggleLoader();
			}
			navigate("/dashboard");
		} catch (err) {
			wtx.toggleLoader();
		}

		// setInvalidInput(true);
		// const firstInvalidInput = validations.find(
		// 	(input) => !input.isValid || null
		// );
		// if (firstInvalidInput) {
		// 	firstInvalidInput.ref?.current?.focus();
		// }
	};

	const clearError = () => {
		if (isError) setError(null);
		if (invalidInput) setInvalidInput(null);
	};

	const firstNameHandler = (e) => {
		clearError();
		dispatchFirstName({ type: "USER_INPUT", val: e.target.value });
		setSignUpData((prevData) => ({
			...prevData,
			firstName: e.target.value,
		}));
	};
	const lastNameHandler = (e) => {
		clearError();
		dispatchLastName({ type: "USER_INPUT", val: e.target.value });
		setSignUpData((prevData) => ({
			...prevData,
			lastName: e.target.value,
		}));
	};
	const emailHandler = (e) => {
		clearError();
		dispatchEmail({ type: "USER_INPUT", val: e.target.value });
		setSignUpData((prevData) => ({
			...prevData,
			email: e.target.value,
		}));
	};
	const usernameHandler = (e) => {
		clearError();
		dispatchUsername({ type: "USER_INPUT", val: e.target.value });
		setSignUpData((prevData) => ({
			...prevData,
			username: e.target.value,
		}));
	};
	const passwordHandler = (e) => {
		clearError();
		dispatchPassword({
			type: "PASS_INPUT",
			val: { target: e.target.value },
		});
		setSignUpData((prevData) => ({
			...prevData,
			password: e.target.value,
		}));
	};
	const roleHandler = () => {
		setSignUpData((prev) => ({
			...prev,
			role: prev.role === "creator" ? "consumer" : "creator",
		}));
	};

	useEffect(() => {
		setSignUpData((prev) => ({
			...prev,
			role: prev.role || "consumer",
		}));
	}, []);

	const validateFirstNameHandler = (e) => {
		dispatchFirstName({ type: "USER_INPUT", val: e.target.value });
	};
	const validateLastNameHandler = (e) => {
		dispatchLastName({ type: "USER_INPUT", val: e.target.value });
	};
	const validateEmailHandler = (e) => {
		dispatchEmail({ type: "USER_INPUT", val: e.target.value });
	};
	const validateUsernameHandler = (e) => {
		dispatchUsername({ type: "USER_INPUT", val: e.target.value });
	};
	const validatePasswordHandler = (e) => {
		dispatchPassword({
			type: "PASS_INPUT",
			val: { target: e.target.value },
		});
	};

	// Login State
	const [loginPage, setLoginPage] = useState(0);
	const loginUserInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const [loginData, setLoginData] = useState({});
	const [isUser, setIsUser] = useState({});
	const [loginUserState, dispatchloginUser] = useReducer(loginUsereducer, {
		val: "",
		isValid: null,
	});
	const [loginPasswordState, dispatchLoginPassword] = useReducer(
		loginPasswordReducer,
		{
			val: "",
			isValid: null,
		}
	);
	const [loginFormIsValid, setLoginFormIsValid] = useState(false);

	const { isValid: loginUserIsValid } = loginUserState;
	const { isValid: loginPasswordIsValid } = loginPasswordState;

	useEffect(() => {
		const indentifier = setTimeout(
			() => setLoginFormIsValid(loginUserIsValid && loginPasswordIsValid),
			500
		);
		return () => {
			clearTimeout(indentifier);
		};
	}, [loginUserIsValid, loginPasswordIsValid]);

	const logIn = async ({ loginUser, password }) => {
		setError(null);
		try {
			const { data } = await axiosInstance.post(`/auth/login`, {
				loginUser,
				password,
			});

			const login = data.data;

			console.log(login);

			if (login) {
				localStorage.setItem("userToken", login.accessToken);
				setIsLoggedIn(true);
				setIsUser(login.user);
				return true;
			}
			return;
		} catch (err) {
			setError(
				err.response?.data?.message || "Login failed. Please try again."
			);
			throw err;
		}
	};

	const onLogOut = () => {
		localStorage.removeItem("userToken");
		setIsLoggedIn(false);
	};

	const onLogIn = async (e) => {
		e.preventDefault();

		if (loginFormIsValid) {
			wtx.toggleLoader();
			try {
				const login = await logIn(loginData);
				if (login) {
					navigate("/dashboard", { replace: true });
				}
			} catch (err) {
				wtx.toggleLoader();
			}
		} else if (!loginUserIsValid) {
			setInvalidInput(true);
			loginUserInputRef.current?.focus();
		} else {
			setInvalidInput(true);
			passwordInputRef.current?.focus();
		}
	};

	const forgotPassword = async ({ loginUser }) => {
		setError(null);
		try {
			await axiosInstance.post("/auth/forgot", {
				loginUser,
			});
			return;
		} catch (err) {
			setError(
				err.response?.data?.message ||
					"The request to reset your password failed. Please try again"
			);
			throw err;
		}
	};

	const onForgotPassword = async (e) => {
		e.preventDefault();

		if (loginUserIsValid) {
			wtx.toggleLoader();
			try {
				await forgotPassword(loginData);
				wtx.toggleLoader();
			} catch (err) {
				wtx.toggleLoader();
			}
		} else {
			setInvalidInput(true);
			loginUserInputRef.current?.focus();
		}
	};

	const loginUserHandler = (e) => {
		clearError();
		dispatchloginUser({ type: "USER_INPUT", val: e.target.value });
		setLoginData((prevData) => ({
			...prevData,
			loginUser: e.target.value,
		}));
	};
	const loginPasswordHandler = (e) => {
		clearError();
		dispatchLoginPassword({ type: "USER_INPUT", val: e.target.value });
		setLoginData((prevData) => ({
			...prevData,
			password: e.target.value,
		}));
	};
	const validateLoginUserHandler = (e) => {
		dispatchloginUser({ type: "INPUT_BLUR", val: e.target.value });
	};
	const validateLoginPasswordHandler = (e) => {
		dispatchLoginPassword({ type: "INPUT_BLUR", val: e.target.value });
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				onSignUp,
				onVerify,
				inputRefs,
				firstNameHandler,
				lastNameHandler,
				emailHandler,
				usernameHandler,
				passwordHandler,
				roleHandler,
				validateFirstNameHandler,
				validateLastNameHandler,
				validateEmailHandler,
				validateUsernameHandler,
				validatePasswordHandler,
				signUpData,
				signUpPage,
				firstNameIsValid,
				lastNameIsValid,
				emailIsValid,
				usernameIsValid,
				passwordIsValid,
				resetSignUpState,
				// Login
				onLogIn,
				onLogOut,
				onForgotPassword,
				loginUserInputRef,
				passwordInputRef,
				loginUserHandler,
				loginPasswordHandler,
				validateLoginUserHandler,
				validateLoginPasswordHandler,
				loginData,
				isUser,
				loginUserIsValid,
				loginPasswordIsValid,
				error: isError,
				invalidInput,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
