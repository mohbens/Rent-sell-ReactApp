import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";

export default function Profile() {
	const auth = getAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,

		// name: " auth.currentUser.displayName",
		// email: "auth.currentUser.email",
	});

	const { name, email } = formData;

	function onLogout() {
		auth.signOut();
		navigate("/");
	}

	return (
		<>
			<section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
				<h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
				<div className=" w-full md:w-[50%] mt-6 px-3 ">
					<form className="">
						<input
							type="text"
							id="name"
							value={name}
							disabled
							className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
						/>
						<input
							type="email"
							id="email"
							value={email}
							disabled
							className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
						/>
						<div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
							<p className="flex items-center ">
								Do you want to change your name ?
								<span className="text-red-600 hover:text-red-700 transition ease-in-out ml-1 cursor-pointer">
									Edit
								</span>
							</p>
							<p
								onClick={onLogout}
								className="text-blue-600 hover:text-blue-700 transition ease-in-out ml-1 cursor-pointer">
								Sign out
							</p>
						</div>
					</form>
					<button
						className=" w-full text-white bg-blue-600 uppercase px-7 py-3 text-sm shadow-sm hover:bg-blue-700 transition ease-in-out  hover:shadow-lg active:bg-blue-800  rounded"
						type="submit">
						<Link
							to="/create-listing"
							className=" flex justify-center items-center">
							<FcHome className=" mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
							Sell or rent your home !
						</Link>
					</button>
				</div>
			</section>
		</>
	);
}
