import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase";

export async function fetchSales() {
	try {
		return fetchListings(["type", "==", "sale"]);
	} catch (error) {
		console.log(error);
	}
}

export async function fetchRents() {
	try {
		return fetchListings(["type", "==", "rent"]);
	} catch (error) {
		console.log(error);
	}
}

export async function fetchOffers() {
	try {
		return fetchListings(["offer", "==", true]);
	} catch (error) {
		console.log(error);
	}
}

// async function fetchListings(criteria) {
// 	try {
// 		// get reference
// 		const listingsRef = collection(db, "listings");
// 		// create the query
// 		const q = query(
// 			listingsRef,
// 			where(...criteria),
// 			orderBy("timestamp", "desc"),
// 			limit(4)
// 		);
// 		// console.log("request start ...");

// 		document.dispatchEvent(new Event("loader_on"));
// 		return getDocs(q).then((querySnap) => {
// 			// console.log("request end ");
// 			document.dispatchEvent(new Event("loader_off"));

// 			const listings = [];
// 			querySnap.forEach((doc) => {
// 				return listings.push({
// 					id: doc.id,
// 					data: doc.data(),
// 				});
// 			});

// 			return listings;
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

async function fetchListings(criteria) {
	try {
		// get reference
		const listingsRef = collection(db, "listings");
		// create the query
		const q = query(
			listingsRef,
			where(...criteria),
			orderBy("timestamp", "desc"),
			limit(4)
		);
		// console.log("request start ...");

		document.dispatchEvent(new Event("loader_on"));
		return getDocs(q).then((querySnap) => {
			// console.log("request end ");
			document.dispatchEvent(new Event("loader_off"));

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
}
