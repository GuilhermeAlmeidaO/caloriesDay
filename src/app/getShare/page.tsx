"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function GetShare() {
	const [queryParams, setQueryParams] = useState("");
	const [isThereLs, setIsThereLs] = useState(true);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const jsonParam = params.get("data");
		setQueryParams(jsonParam || "");
		if ((jsonParam || "") === "") window.location.href = "/";

		const objLs = {
			food_saved: localStorage.getItem("food_saved"),
			food_day: localStorage.getItem("food_day"),
		};

		if (objLs.food_day === null || objLs.food_saved === null) {
			setIsThereLs(false);
		}

		if (!isThereLs) {
			const parsedData = JSON.parse(decodeURIComponent(queryParams));
			Object.entries(parsedData).forEach(([key, value]) => {
				localStorage.setItem(key, value as string);
			});
			console.log(parsedData);
			window.location.href = "/";
		}
	}, [isThereLs, queryParams]);

	const handleConfirm = () => {
		const parsedData = JSON.parse(decodeURIComponent(queryParams));
		Object.entries(parsedData).forEach(([key, value]) => {
			localStorage.setItem(key, value as string);
		});
		console.log(parsedData);
		window.location.href = "/";
	};

	return (
		<div className="min-h-[100dvh] bg-neutral-950 text-white flex items-center justify-center">
			<div className="border border-neutral-500 px-3 py-5 rounded-sm w-1/3 space-y-3">
				<div>
					<h1 className="text-lg font-semibold text-center">
						Você tem certeza?
					</h1>
					<p className="text-neutral-300 text-center">
						Se você fizer o histórico que está salvo no seu dispositivo vai ser
						substituido pelos os novos dados
					</p>
				</div>
				<div className="w-full flex gap-3 justify-end">
					<Button onClick={handleConfirm}>Continuar</Button>
					<Button
						variant={"destructive"}
						onClick={() => (window.location.href = "/")}
					>
						Cancelar
					</Button>
				</div>
			</div>
		</div>
	);
}
