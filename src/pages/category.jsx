import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";
import { Sales, Rents } from "../Services/Services";
import { ListingsClient } from "../Services/useClient";

const client = new ListingsClient();
export default function Category() {
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchListing] = useState(true);
	const [rentListings, setRentListings] = useState(null);
	const [saleListings, setSaleListings] = useState(null);
	const params = useParams();
	useEffect(() => {
		if (params.categoryName === "rent") {
			const resultRents = Rents(client);
			resultRents
				.then((list) => {
					setRentListings(list);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching offers:", error);
				});
		} else if (params.categoryName === "sale") {
			const resultSales = Sales(client);
			resultSales
				.then((list) => {
					setSaleListings(list);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching offers:", error);
				});
		}
	}, [params.categoryName]);

	async function onFetchMoreListings() {
		try {
			const newListSales = Sales(client);
			const newListRent = Rents(client);
			if (params.categoryName === "rent") {
				newListRent.then((list) => {
					setRentListings((prevListings) => [...prevListings, ...list]);
					if (list.length === 0) {
						setLastFetchListing(false);
					}
				});
			} else {
				newListSales.then((list) => {
					setSaleListings((prevListings) => [...prevListings, ...list]);
					if (list.length === 0) {
						setLastFetchListing(false);
					}
				});
			}
			setLoading(false);
		} catch (error) {
			toast.error("Could not fetch listing");
		}
	}

	return (
		<div className="max-w-6xl mx-auto px-3">
			<h1 className="text-3xl text-center mt-6 font-bold mb-6">
				{params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
			</h1>
			{loading ? (
				<Spinner />
			) : params.categoryName === "rent" &&
			  rentListings &&
			  rentListings.length > 0 ? (
				<>
					<main>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
							{rentListings.map((listing) => (
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
			) : params.categoryName === "sale" &&
			  saleListings &&
			  saleListings.length > 0 ? (
				<>
					<main>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
							{saleListings.map((listing) => (
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
				<p className="text-3xl text-center mt-12 font-bold mb-6 text-red-500">
					--- There are no current places for{" "}
					{params.categoryName === "rent" ? "rent" : "sale "}---
				</p>
			)}
		</div>
	);
}
