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
	const [totalNutrients, setTotalNutrients] = useState<TotalType | undefined>();

	function handleChangeTotalNutrients(total: TotalType) {
		setTotalNutrients(total);
	}

	const [foodDay, setFoodDay] = useState<FoodDayType[]>([]);
	const [limitNutrients, setLimitNutrients] = useState<LimitNutrientsType>({
		carb: 0,
		fat: 0,
		kcal: 0,
		protein: 0,
	});

	useEffect(() => {
		const ls = localStorage.getItem("limit_nutrients");
		setLimitNutrients(JSON.parse(ls!));
		setFoodDay(JSON.parse(localStorage.getItem("food_day") || "[{}]"));

		const currentDay = new Date().getDate();
		if (!localStorage.getItem("lastDay")) {
			localStorage.setItem("lastDay", JSON.stringify(currentDay));
		}
		const lastDay = localStorage.getItem("lastDay") as string;
		if (lastDay !== currentDay.toString()) {
			localStorage.setItem("food_day", JSON.stringify([]));
		}
	}, []);

	const handleChangeFoodDay = () => {
		setFoodDay(JSON.parse(localStorage.getItem("food_day") || "[{}]"));
	};

	return (
		<div className="bg-neutral-950 min-h-[100dvh] text-white">
			<div className="md:h-[90dvh] flex flex-col md:p-10 max-md:min-h-[100dvh] max-md:pb-[5dvh]">
				<div className="flex gap-5 justify-end max-md:flex-col max-md:px-10 max-md:pt-10">
					<div className="w-1/2 space-y-3 max-md:hidden">
						<h3 className="text-xl font-semibold mb-2">Limite Diário</h3>
						{limitNutrients ? (
							Object.entries(limitNutrients).map((value, index) => (
								<div key={index} className="w-full flex items-center">
									<p className="w-[150px] text-lg">
										{value[0] === "kcal"
											? "Calorias:"
											: value[0] === "protein"
											? "Proteinas (g):"
											: value[0] === "carb"
											? "Carboidratos (g):"
											: value[0] === "fat"
											? "Gorduras (g):"
											: ""}
									</p>
									<div className="w-20 border-[1px] cursor-pointer border-neutral-400 rounded-sm py-1 pl-2 pr-5 hover:bg-black/30">
										{value[1]}
									</div>
								</div>
							))
						) : (
							<div></div>
						)}
					</div>
					<div className="w-1/2 space-y-3 max-lg:w-5/6 max-md:w-full">
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
											? "Proteinas"
											: value[0] === "carb"
											? "Carboidratos"
											: value[0] === "fat"
											? "Gorduras"
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
			<div className="h-[15dvh] flex justify-center md:fixed bottom-0 w-full">
				<BarTools updateListFoodFunc={handleChangeFoodDay} />
			</div>
		</div>
	);
}
