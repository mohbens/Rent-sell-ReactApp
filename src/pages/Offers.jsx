import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { ListingsClient } from "../Services/useClient";

import { Offers } from "../Services/Services";
const client = new ListingsClient();
export default function OffersP() {
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchListing] = useState(true);
	const [offerListings, setOfferListings] = useState(null);

	useEffect(() => {
		const resultOffers = Offers(client);
		resultOffers
			.then((list) => {
				if (list.length === 0) {
					setLastFetchListing(false);
				}
				setOfferListings(list);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching offers:", error);
			});
	}, []);

	async function onFetchMoreListings() {
		try {
			const newListOffers = Offers(client);

			newListOffers.then((list) => {
				setOfferListings((prevListings) => [...prevListings, ...list]);

				if (list.length === 0) {
					setLastFetchListing(false);
				}
			});
		} catch (error) {
			toast.error("Could not fetch listing");
		}
	}

	return (
		<div className="max-w-6xl mx-auto px-3">
			<h1 className="text-3xl text-center mt-6 font-bold mb-6">Offers</h1>
			{loading ? (
				<Spinner />
			) : offerListings && offerListings.length > 0 ? (
				<>
					<main>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
							{offerListings.map((listing) => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
								/>
							))}
						</ul>
					</main>
					{lastFetchedListing && (
						<div className="flex justify-center items-center">
							<button
								onClick={onFetchMoreListings}
								className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out">
								Load more
							</button>
						</div>
					)}
				</>
			) : (
				<p>There are no current offers</p>
			)}
		</div>
	);
}
