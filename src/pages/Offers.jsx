import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

import { useClient } from "../Services/useClient";

import { Offers } from "../Services/Services";
export default function OffersP() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchListing] = useState(true);

	const fetchListings = useClient();

	useEffect(() => {
		fetchListings(["offer", "==", true], 4).then((list) => {
			if (list.length === 0) {
				setLastFetchListing(false);
			}
			console.log(list);
			setListings(list);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		Offers();
		// console.log("listings------------------");
		// console.log(listings);
	}, [listings]);

	async function onFetchMoreListings() {
		try {
			fetchListings(["offer", "==", true], 1).then((list) => {
				// console.log(list);
				setListings([...listings, ...list]);
				setLoading(false);

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
			{/* <pre>{JSON.stringify(listings, null, 2)}</pre> */}
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
							{listings.map((listing) => (
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
					)}{" "}
				</>
			) : (
				<p>There are no current offers</p>
			)}
		</div>
	);
}
