import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";
import { db } from "../firebase";

export async function sendQuery(criteria, nbElements, lastFetchedListing) {
	const listingsRef = collection(db, "listings");

	const params = [
		listingsRef,
		where(...criteria),
		orderBy("timestamp", "desc"),
		limit(nbElements),
	];

	if (lastFetchedListing) {
		params.push(startAfter(lastFetchedListing));
	}

	const q = query(...params);

	document.dispatchEvent(new Event("loader_on"));

	return getDocs(q)
		.then((querySnap) => {
			document.dispatchEvent(new Event("loader_off"));
			const lastVisible = querySnap.docs[querySnap.docs.length - 1];
			const listings = [];
			querySnap.forEach((doc) => {
				listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			return { listings, lastVisible };
		})
		.catch((error) => {
			console.error(error);
			document.dispatchEvent(new Event("loader_off"));
			throw error;
		});
}

export class ListingsClient {
	constructor() {
		this.lastFetchedListing = null;
		this.listings = [];
	}

	async fetchListings(criteria, nbElements) {
		try {
			const { listings, lastVisible } = await sendQuery(
				criteria,
				nbElements,
				this.lastFetchedListing
			);
			if (lastVisible) {
				this.lastFetchedListing = lastVisible;
			}

			this.listings = listings;
			return listings;
		} catch (error) {
			return [error];
		}
	}
}
