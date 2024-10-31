import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useClient } from "./useClient";
import { ListingsClient } from "./useClient";

export function Offers() {
	const client = new ListingsClient();

	return client
		.fetchListings(["offer", "==", true], 4)
		.then((listings) => {
			console.log("The HomeService test is working");
			return listings;
		})
		.catch((error) => {
			console.error("Error fetching offers in Test:", error);
			throw error;
		});
}

export function Sales() {
	const client = new ListingsClient();

	return client
		.fetchListings(["type", "==", "sale"], 4)
		.then((listings) => {
			console.log("The HomeService test is working");
			return listings;
		})
		.catch((error) => {
			console.error("Error fetching offers in Test:", error);
			throw error;
		});
}

export function Rents() {
	const client = new ListingsClient();

	return client
		.fetchListings(["type", "==", "rent"], 4)
		.then((listings) => {
			console.log("The HomeService test is working");
			return listings;
		})
		.catch((error) => {
			console.error("Error fetching offers in Test:", error);
			throw error;
		});
}

// export function OffersPage() {
// 	const [listings, setListings] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const fetchListings = useClient();

// 	useEffect(() => {
// 		fetchListings(["offer", "==", true], 4).then((list) => {
// 			// console.log("list", list);
// 			setListings(list);
// 			setLoading(false);
// 		});
// 	}, []);
// 	useEffect(() => {}, [listings]);

// 	async function onFetchMoreListings() {
// 		try {
// 			fetchListings(["offer", "==", true], 4).then((list) => {
// 				// console.log(list);
// 				setListings([...listings, ...list]);
// 				setLoading(false);
// 			});
// 		} catch (error) {
// 			toast.error("Could not fetch listing");
// 		}
// 	}
// 	// console.log("offers", listings);
// 	return listings;
// }

// export function Test() {
// 	const client = new ListingsClient();

// 	return client
// 		.fetchListings(["offer", "==", true], 4)
// 		.then((listings) => {
// 			console.log("The HomeService test is working");
// 			return listings;
// 		})
// 		.catch((error) => {
// 			console.error("Error fetching offers in Test:", error);
// 			throw error;
// 		});
// }
