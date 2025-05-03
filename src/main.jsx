import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApiProvider } from "./store/context/ApiContext.jsx";
import "./index.css";
import { AuthContextProvider } from "./store/context/authContext.jsx";
import { WorkerContextProvider } from "./store/context/workerContext.jsx";
import { GalleryContextProvider } from "./store/context/galleryContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<WorkerContextProvider>
				<AuthContextProvider>
					<GalleryContextProvider>
						<App />
					</GalleryContextProvider>
				</AuthContextProvider>
			</WorkerContextProvider>
		</BrowserRouter>
	</StrictMode>
);
