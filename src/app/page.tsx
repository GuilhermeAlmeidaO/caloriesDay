"use client";

import { useEffect, useState } from "react";
import { Index } from "../components";
import { StartModule } from "../components/startModule";

export default function CaloriesDay() {
	const [isThereLs, setIsThereLs] = useState(false);

	useEffect(() => {
		const ls = localStorage.getItem("personal_data");
		if (ls) {
			setIsThereLs(true);
		} else {
			setIsThereLs(false);
		}
	}, []);

	if (isThereLs) {
		const ls = localStorage.getItem("personal_data");
		if (!ls) return;
		return <Index />;
	} else {
		return <StartModule />;
	}
}
