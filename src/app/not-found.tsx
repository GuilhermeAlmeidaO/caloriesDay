"use client";
import { useEffect } from "react";

export default function NotFound() {
	useEffect(() => {
		window.location.href = "/";
	}, []);

	return <div className="min-h-[100dvh] bg-neutral-900"></div>;
}
