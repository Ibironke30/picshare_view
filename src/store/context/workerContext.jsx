import { createContext, useState, ReactNode } from "react";

export const WorkerContext = createContext({
	isLoading: false,
	toggleLoader: () => {},
});

export const WorkerContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	const toggleLoader = () => {
		setIsLoading((prev) => !prev);
	};

	return (
		<WorkerContext.Provider
			value={{
				isLoading,
				toggleLoader,
			}}
		>
			{children}
		</WorkerContext.Provider>
	);
};

export default WorkerContext;
