import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export function useClient() {
	const [lastFetchedListing, setLastFetchListing] = useState(null);

	return async function fetchListings(criteria, nbElements) {
		console.log("----------------------");
		try {
			// get reference
			const listingsRef = collection(db, "listings");

			const params = [
				listingsRef,
				where(...criteria),
				orderBy("timestamp", "desc"),
				// startAfter(lastFetchedListing),
				limit(nbElements),
			];

			if (lastFetchedListing) {
				params.push(startAfter(lastFetchedListing));
			}

			// create the query
			const q = query(
				// listingsRef,
				// where(...criteria),
				// orderBy("timestamp", "desc"),
				// // startAfter(lastFetchedListing),
				// limit(nbElements),

				// lastFetchedListing && startAfter(lastFetchedListing)
				...params
			);
			console.log(q);
			console.log(criteria, nbElements);

			document.dispatchEvent(new Event("loader_on"));
			return getDocs(q).then((querySnap) => {
				// console.log("request end ");
				document.dispatchEvent(new Event("loader_off"));
				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchListing(lastVisible);
				console.log(querySnap.docs);

				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				return listings;
			});
		} catch (error) {
			console.log(error);
		}
	};
}
