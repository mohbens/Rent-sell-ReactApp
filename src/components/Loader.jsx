import React, { useEffect, useRef, useState } from "react";

export default function Loader() {
	const [loading, setLoading] = useState(false);
	const [nbRequests, setNbRequests] = useState(0);

	const ref = useRef(null);

	useEffect(() => {
		console.log(ref.current);

		function increaseNb() {
			setNbRequests((prev) => prev + 1);
		}
		function decreaseNb() {
			setNbRequests((prev) => prev - 1);
		}

		document.addEventListener("loader_on", increaseNb);
		document.addEventListener("loader_off", decreaseNb);
		return () => {
			document.removeEventListener("loader_on", increaseNb);
			document.removeEventListener("loader_off", decreaseNb);
		};
	}, []);

	useEffect(() => {
		console.log(nbRequests);
	}, [nbRequests]);

	return (
		<div
			ref={ref}
			style={{
				zIndex: 1000,
				position: "absolute",
				top: "8px",
				right: "8px",
				// width: "8px",
				// height: "8px",
				backgroundColor: "lightblue",
			}}>
			{nbRequests > 0 && <div>loading ....</div>}
		</div>
	);
}
