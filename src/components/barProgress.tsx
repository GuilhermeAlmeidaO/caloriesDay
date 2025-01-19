import { Progress } from "@/components/ui/progress";

interface Props {
	consumed: number;
	nutrient: string;
	limit: number;
}

export function BarProgress({ nutrient, consumed, limit }: Props) {
	const percentage = Math.min((consumed / limit) * 100, 100);
	return (
		<div className="w-full flex flex-col items-center gap-1">
			<div className="flex items-center justify-between w-full text-lg">
				<p>{nutrient}</p>
				<p>
					{consumed.toFixed(1)} / {limit}{" "}
					{nutrient === "Calorias" ? "kcal" : "g"}
				</p>
			</div>
			<Progress value={percentage} />
		</div>
	);
}
