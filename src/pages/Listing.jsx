import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from "swiper";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import {
	FaBath,
	FaBed,
	FaChair,
	FaMapMarkerAlt,
	FaParking,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
export default function Listing() {
	const auth = getAuth();
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);

	const [contactLandlord, setContactLandlord] = useState(false);

	SwiperCore.use([Autoplay, Navigation, Pagination]);

	useEffect(() => {
		async function fetchListing() {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		}
		fetchListing();
	}, [params.listingId]);

	if (loading) {
		return <Spinner />;
	}
	return (
		<main>
			<Swiper
				slidesPerView={1}
				navigation
				pagination={{ type: "progressbar" }}
				effect="fade"
				modules={[EffectFade]}
				autoplay={{ delay: 3000 }}>
				{listing.imgUrls.map((url, index) => (
					<SwiperSlide key={index}>
						<div
							className="relative w-full overflow-hidden h-[500px]"
							style={{
								background: `url(${listing.imgUrls[index]}) center no-repeat`,
								backgroundSize: "cover",
							}}></div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-white lg:space-x-5">
				<div className=" w-full ">
					<p className="text-2xl font-bold mb-3 text-blue-900">
						{listing.name} -
						{listing.offer
							? listing.discountedPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: listing.regularPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						DA
						{listing.type === "rent" ? " / month " : ""}
					</p>
					<p className="flex items-center mt-6 mb-3 font-semibold">
						<FaMapMarkerAlt className="text-green-600 mr-1 " />
						{listing.address}
					</p>
					<div className="flex justify-start items-center space-x-4 w-[75%]">
						<p className="bg-red-800 w-full max-w-[200px] text-white rounded-md p-1 font-semibold shadow-md">
							{listing.type === "rent" ? "Rent" : "Sale"}
						</p>
						{listing.offer && (
							<p className="w-full max-x-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
								{listing.regularPrice - listing.discountedPrice} DA discount
							</p>
						)}
					</div>
					<p className="mt-3 mb-3">
						<span className="font-semibold ">Description -</span>
						{listing.description}
					</p>
					<ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-10 ">
						<li className="flex items-center whitespace-nowrap">
							<FaBed className="text-lg mr-1" />
							{+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
						</li>
						<li className="flex items-center whitespace-nowrap">
							<FaBath className="text-lg mr-1" />
							{+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
						</li>
						<li className="flex items-center whitespace-nowrap">
							<FaParking className="text-lg mr-1" />
							{listing.parking ? "Parking spot" : "No parking"}
						</li>
						<li className="flex items-center whitespace-nowrap">
							<FaChair className="text-lg mr-1" />
							{listing.furnished ? "Furnished" : "Not furnished"}
						</li>
					</ul>
					{listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
						<div className="mt-6">
							<button
								onClick={() => setContactLandlord(true)}
								className="px-7 py-3 bg-blue-600 rounded text-white font-medium text-sm uppercase shadow-md hover:shadow-lg hover:bg-blue-700 w-full focus:bg-blue-800 text-center transition duration-150 ease-in-out">
								Contact Landlord
							</button>
						</div>
					)}
					{contactLandlord && (
						<Contact userRef={listing.userRef} listing={listing} />
					)}
				</div>
				<div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
					<MapContainer
						center={[listing.geolocation.lat, listing.geolocation.lng]}
						zoom={13}
						scrollWheelZoom={false}
						style={{ height: "100%", width: "100%" }}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker
							position={[listing.geolocation.lat, listing.geolocation.lng]}>
							<Popup>{listing.address}</Popup>
						</Marker>
					</MapContainer>
				</div>
			</div>
		</main>
	);
}
