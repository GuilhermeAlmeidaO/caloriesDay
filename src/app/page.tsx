"use client";

export default function Home() {
	const redirectCaloriesDay = () => {
		window.location.href = "/caloriesDay";
	};
	return (
		<div className="bg-slate-950 h-[100dvh] text-white flex items-center justify-center">
			<button
				className="border-[1px] border-white px-5 py-2 rounded-md"
				onClick={redirectCaloriesDay}
			>
				Calories Day
			</button>
		</div>
	);
}
