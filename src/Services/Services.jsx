export function Offers(clientO) {
	return clientO
		.fetchListings(["offer", "==", true], 4)
		.then((listings) => {
			return listings;
		})
		.catch((error) => {
			console.error("Error fetching offers in Test:", error);
			throw error;
		});
}

export function Sales(client) {
	return client
		.fetchListings(["type", "==", "sale"], 4)
		.then((listings) => {
			return listings;
		})
		.catch((error) => {
			console.error("Error fetching offers in Test:", error);
			throw error;
		});
}

export function Rents(client) {
	return client
		.fetchListings(["type", "==", "rent"], 4)
		.then((listings) => {
			return listings;
		})
		.catch((error) => {
			console.error("Error fetching offers in Test:", error);
			throw error;
		});
}
