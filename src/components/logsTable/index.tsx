"use client";

import { useEffect, useMemo, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FoodDayType, LimitNutrientsType, TotalType } from "..";
import { EditDialog } from "./editDialog";
import { TrashDialog } from "./trashDialog";

interface Props {
	foodDay: FoodDayType[];
	shareTotalNutrients: (total: TotalType) => void;
	limitNutrient: LimitNutrientsType;
	updateListFoodFunc: () => void;
}

export function LogsTable({
	foodDay,
	shareTotalNutrients,
	limitNutrient,
	updateListFoodFunc,
}: Props) {
	const [totalNutrients, setTotalNutrients] = useState({
		kcal: 0,
		protein: 0,
		carb: 0,
		fat: 0,
	});
	const [remaingNutrients, setRemaingNutrients] = useState({
		kcal: 0,
		protein: 0,
		carb: 0,
		fat: 0,
	});

	const totals = useMemo(() => {
		return foodDay.reduce(
			(acc, value) => {
				if (Object.keys(value).length === 0) return acc;

				return {
					kcal: acc.kcal + value.kcal,
					protein: acc.protein + value.protein,
					carb: acc.carb + value.carb,
					fat: acc.fat + value.fat,
				};
			},
			{ kcal: 0, protein: 0, carb: 0, fat: 0 }
		);
	}, [foodDay]);

	useEffect(() => {
		setTotalNutrients(totals);
		shareTotalNutrients(totals);

		const remaing = {
			kcal:
				Math.max(limitNutrient.kcal - totals.kcal) < 0
					? 0
					: Math.max(limitNutrient.kcal - totals.kcal),
			protein:
				Math.max(limitNutrient.protein - totals.protein) < 0
					? 0
					: Math.max(limitNutrient.protein - totals.protein),
			carb:
				Math.max(limitNutrient.carb - totals.carb) < 0
					? 0
					: Math.max(limitNutrient.carb - totals.carb),
			fat:
				Math.max(limitNutrient.fat - totals.fat) < 0
					? 0
					: Math.max(limitNutrient.fat - totals.fat),
		};

		setRemaingNutrients(remaing);
	}, [totals, shareTotalNutrients, limitNutrient]);

	return (
		<div className="mt-7 flex-grow overflow-auto relative">
			<Table className=" text-base">
				<TableHeader>
					<TableRow className="bg-neutral-800/25">
						<TableHead className="py-4 font-bold">Item comida</TableHead>
						<TableHead className="py-4 font-bold">Calorias</TableHead>
						<TableHead className="py-4 font-bold">Proteinas (g)</TableHead>
						<TableHead className="py-4 font-bold">Carboidratos (g)</TableHead>
						<TableHead className="py-4 font-bold">Gorduras (g)</TableHead>
						<TableHead className="py-4 font-bold text-center">Edite</TableHead>
						<TableHead className="py-4 font-bold text-center">
							Excluir
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{foodDay.map((value, index) => {
						if (Object.keys(value).length === 0) return;
						return (
							<TableRow key={index}>
								<TableCell className="py-2">{value.name}</TableCell>
								<TableCell className="py-2">{value.kcal}</TableCell>
								<TableCell className="py-2">{value.protein}</TableCell>
								<TableCell className="py-2">{value.carb}</TableCell>
								<TableCell className="py-2">{value.fat}</TableCell>
								<TableCell className="py-2 text-center">
									<EditDialog
										foodData={value}
										listFood={foodDay}
										updateListFoodFunc={updateListFoodFunc}
									/>
								</TableCell>
								<TableCell className="py-2 text-center">
									<TrashDialog
										dataFood={value}
										listFood={foodDay}
										updateListFoodFunc={updateListFoodFunc}
									/>
								</TableCell>
							</TableRow>
						);
					})}
					<TableRow className="font-bold bg-neutral-800/25">
						<TableCell className="py-4">Total</TableCell>
						{Object.entries(totalNutrients).map((value, index) => (
							<TableCell className="py-4" key={index}>
								{value[1].toFixed(1)}
							</TableCell>
						))}
						<TableCell className="py-4"></TableCell>
						<TableCell className="py-4"></TableCell>
					</TableRow>
					<TableRow className="font-bold text-green-400 bg-neutral-800/25">
						<TableCell className="py-4">Restante</TableCell>
						{Object.entries(remaingNutrients).map((value, index) => (
							<TableCell className="py-4" key={index}>
								{value[1].toFixed(1)}
							</TableCell>
						))}
						<TableCell className="py-4"></TableCell>
						<TableCell className="py-4"></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
