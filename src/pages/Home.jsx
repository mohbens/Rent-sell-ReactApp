import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";

import { Offers, Sales, Rents } from "../Services/Services";

export default function Home() {
	const [offerListings, setOfferListings] = useState(null);
	const [saleListings, setSaleListings] = useState(null);
	const [rentListings, setRentListings] = useState(null);

	useEffect(() => {
		const resultOffers = Offers();
		console.log(resultOffers);
		resultOffers
			.then((list) => {
				setOfferListings(list);
			})
			.catch((error) => {
				console.error("Error fetching offers:", error);
			});

		const resultSales = Sales();
		console.log(resultSales);
		resultSales
			.then((list) => {
				setSaleListings(list);
			})
			.catch((error) => {
				console.error("Error fetching offers:", error);
			});

		const resultRents = Rents();
		console.log(resultRents);
		resultRents
			.then((list) => {
				setRentListings(list);
			})
			.catch((error) => {
				console.error("Error fetching offers:", error);
			});
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
