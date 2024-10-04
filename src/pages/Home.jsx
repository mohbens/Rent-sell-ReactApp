import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";

export default function Home() {
	return <Slider />;
}
