// import {
// 	collection,
// 	getDoc,
// 	getDocs,
// 	limit,
// 	orderBy,
// 	query,
// 	startAfter,
// 	where,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { useState } from "react";

// function sendQuery() {}

// export function useClient() {
// 	const [lastFetchedListing, setLastFetchListing] = useState(null);

// 	return async function fetchListings(criteria, nbElements) {
// 		console.log("----------------------");
// 		try {
// 			// get reference
// 			const listingsRef = collection(db, "listings");

// 			const params = [
// 				listingsRef,
// 				where(...criteria),
// 				orderBy("timestamp", "desc"),
// 				// startAfter(lastFetchedListing),
// 				limit(nbElements),
// 			];

// 			if (lastFetchedListing) {
// 				params.push(startAfter(lastFetchedListing));
// 				console.log("lastFetchedlist", lastFetchedListing);
// 			}

// 			// create the query
// 			const q = query(...params);

// 			document.dispatchEvent(new Event("loader_on"));
// 			return getDocs(q).then((querySnap) => {
// 				// console.log("request end ");
// 				document.dispatchEvent(new Event("loader_off"));
// 				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
// 				if (lastVisible) {
// 					setLastFetchListing(lastVisible);
// 				}
// 				const listings = [];
// 				querySnap.forEach((doc) => {
// 					return listings.push({
// 						id: doc.id,
// 						data: doc.data(),
// 					});
// 				});

// 				return listings;
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// }

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
import { Component, useState } from "react";

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
		console.log("lastFetchedlist", lastFetchedListing);
	}

	// create the query
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
			throw error; // Propagate the error
		});

	// try {
	// 	const querySnap = await getDocs(q);
	// 	document.dispatchEvent(new Event("loader_off"));

	// 	const lastVisible = querySnap.docs[querySnap.docs.length - 1];
	// 	const listings = [];
	// 	querySnap.forEach((doc) => {
	// 		listings.push({
	// 			id: doc.id,
	// 			data: doc.data(),
	// 		});
	// 	});

	// 	return { listings, lastVisible };
	// } catch (error) {
	// 	console.error(error);
	// 	document.dispatchEvent(new Event("loader_off"));
	// 	throw error; // Propagate the error
	// }
}

//

//    class avec listing / lastElement

export function useClient() {
	const [lastFetchedListing, setLastFetchListing] = useState(null);

	return function fetchListings(criteria, nbElements) {
		return sendQuery(criteria, nbElements, lastFetchedListing)
			.then(({ listings, lastVisible }) => {
				if (lastVisible) {
					setLastFetchListing(lastVisible);
				}
				return listings;
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export class ListingsClient {
	constructor() {
		this.lastFetchedListing = null;
		this.listings = [];
	}

	async fetchListings(criteria, nbElements) {
		try {
			console.log("the useClient Test is working ");
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
			console.log(error);
			return [error];
		}
	}
}
