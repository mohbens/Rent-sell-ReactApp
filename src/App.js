import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
export default function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/forgotPassword" element={<ForgotPassword />} />
					<Route path="/offers" element={<Offers />} />
					<Route
						path="/category/:categoryName/:listingId"
						element={<Listing />}
					/>

					<Route path="/Create-listing" element={<PrivateRoute />}>
						<Route path="/Create-listing" element={<CreateListing />} />
					</Route>
					<Route path="/Edit-listing" element={<PrivateRoute />}>
						<Route path="/Edit-listing:listingId" element={<EditListing />} />
					</Route>

					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
}
