import React from "react";
import { FileUploader } from "../component/uploadToCloudinary.jsx";
import Contactus from "../component/Contactus.jsx";
import Classes from "../component/Classes.jsx";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<Classes />
			<FileUploader />
			<Contactus />
		</div>
	);
};
