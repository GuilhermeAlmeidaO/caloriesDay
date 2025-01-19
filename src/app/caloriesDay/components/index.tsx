import { BarProgress } from "./barProgress";
import { BarTools } from "./barTools";
import { LogsTable } from "./logsTable";
import { useState, useEffect } from "react";

export interface FoodDayType {
	name: string;
	carb: number;
	fat: number;
	kcal: number;
	protein: number;
	id: number;
}

export type TotalType = {
	kcal: number;
	protein: number;
	carb: number;
	fat: number;
};

export type LimitNutrientsType = {
	carb: number;
	protein: number;
	fat: number;
	kcal: number;
};

export function Index() {
	function handleChangeTotalNutrients(total: TotalType) {
		setTotalNutrients(total);
	}

	const [foodDay, setFoodDay] = useState<FoodDayType[]>([]);
	useEffect(() => {
		setFoodDay(JSON.parse(localStorage.getItem("food_day") || "[{}]"));
	}, []);

	const [totalNutrients, setTotalNutrients] = useState<TotalType | undefined>();

	const handleChangeFoodDay = () => {
		setFoodDay(JSON.parse(localStorage.getItem("food_day") || "[{}]"));
	};

	const [limitNutrients, setLimitNutrients] = useState<LimitNutrientsType>({
		carb: 0,
		fat: 0,
		kcal: 0,
		protein: 0,
	});

	useEffect(() => {
		const ls = localStorage.getItem("limit_nutrients");
		setLimitNutrients(JSON.parse(ls!));
	}, []);

	return (
		<div className="bg-neutral-950 min-h-[100dvh] text-white">
			<div className="h-[90dvh] flex flex-col p-10">
				<div className="flex gap-5 justify-end">
					<div className="w-1/2 space-y-3">
						<h3 className="text-xl font-semibold mb-2">Limite Diário</h3>
						{limitNutrients ? (
							Object.entries(limitNutrients).map((value, index) => (
								<div key={index} className="w-1/2 flex items-center gap-2">
									<p className="w-1/2 text-lg">
										{value[0] === "kcal"
											? "Calorias:"
											: value[0] === "protein"
											? "Proteina (g):"
											: value[0] === "carb"
											? "Carboidrato (g):"
											: value[0] === "fat"
											? "Gordura (g):"
											: ""}
									</p>
									<div className="w-1/2 border-[1px] cursor-pointer border-neutral-400 rounded-sm py-1 pl-2 pr-5">
										{value[1].toFixed(2)}
									</div>
								</div>
							))
						) : (
							<div></div>
						)}
					</div>
					<div className="w-1/2 space-y-3">
						<h3 className="text-xl font-semibold mb-2">Diário Progresso</h3>
						{totalNutrients ? (
							Object.entries(totalNutrients).map((value, index) => (
								<BarProgress
									consumed={value[1]}
									limit={limitNutrients![value[0] as keyof LimitNutrientsType]}
									nutrient={
										value[0] === "kcal"
											? "Calorias"
											: value[0] === "protein"
											? "Proteina"
											: value[0] === "carb"
											? "Carboidrato"
											: value[0] === "fat"
											? "Gordura"
											: ""
									}
									key={index}
								/>
							))
						) : (
							<div></div>
						)}
					</div>
				</div>
				<LogsTable
					foodDay={foodDay}
					shareTotalNutrients={handleChangeTotalNutrients}
					limitNutrient={limitNutrients}
					updateListFoodFunc={handleChangeFoodDay}
				/>
			</div>
			<div className="h-[15dvh] flex justify-center fixed bottom-0 w-full">
				<BarTools updateListFoodFunc={handleChangeFoodDay} />
			</div>
		</div>
	);
}
