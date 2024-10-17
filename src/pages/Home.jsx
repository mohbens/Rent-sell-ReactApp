// import {
// 	collection,
// 	getDoc,
// 	getDocs,
// 	limit,
// 	orderBy,
// 	query,
// 	where,
// } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
// import { db } from "../firebase";
import * as client from "../Services/HomeService";

export default function Home() {
	// Offers
	const [offerListings, setOfferListings] = useState(null);
	const [rentListings, setRentListings] = useState(null);
	const [saleListings, setSaleListings] = useState(null);

	useEffect(() => {
		client.fetchOffers().then((list) => {
			setOfferListings(list);
		});
		client.fetchRents().then((list) => {
			setRentListings(list);
		});

		client.fetchSales().then((list) => {
			setSaleListings(list);
		});

		// client.fetchListings1().then((list) => {
		// 	setOfferListings(list);
		// });

		// setTimeout(() => {
		// 	client.fetchListings2().then((list) => {
		// 		setRentListings(list);
		// 	});
		// }, 1000);

		// setTimeout(() => {
		// 	client.fetchListings3().then((list) => {
		// 		setSaleListings(list);
		// 	});
		// }, 2000);
	}, []);

	return (
		<div>
			<Slider />
			<div className="max-w-6xl mx-auto pt-4 space-y-6">
				{offerListings && offerListings.length > 0 && (
					<div className="m-2 mb-6">
						<h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
						<Link to="/offers">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
								Show more offers
							</p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
							{offerListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
				{rentListings && rentListings.length > 0 && (
					<div className="m-2 mb-6">
						<h2 className="px-3 text-2xl mt-6 font-semibold">
							Places for rent
						</h2>
						<Link to="/category/rent">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
								Show more places for rent
							</p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
							{rentListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
				{saleListings && saleListings.length > 0 && (
					<div className="m-2 mb-6">
						<h2 className="px-3 text-2xl mt-6 font-semibold">
							Places for sale
						</h2>
						<Link to="/category/sale">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
								Show more places for sale
							</p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
							{saleListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
