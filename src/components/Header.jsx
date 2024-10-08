import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
	const [pageState, setPageState] = useState("Sign in");
	const navigate = useNavigate();
	const location = useLocation();
	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setPageState("Profile");
			} else {
				setPageState("Sign in");
			}
		});
	}, [auth]);

	function pathMatchRoute(route) {
		if (route === location.pathname) {
			return true;
		}
	}
	return (
		<div className="bg-white border-b shadow sticky top-0 z-50">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img
						src="https://as1.ftcdn.net/v2/jpg/09/65/90/84/1000_F_965908404_zhcMN0yt2WM5VMmBpcZSucl6j85V69m1.jpg"
						alt="logo"
						className="h-5 cursor-pointer"
						onClick={() => navigate("/")}
					/>
				</div>

				<div>
					<ul className="flex space-x-10">
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/") && "text-black border-b-red-500"
							}`}
							onClick={() => navigate("/")}>
							Home
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/offers") && "text-black border-b-red-500"
							}`}
							onClick={() => navigate("/offers")}>
							Offers
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/sign-in") ||
								(pathMatchRoute("/profile") && "text-black border-b-red-500")
							}`}
							onClick={() => navigate("/profile")}>
							{pageState}
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
}
