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
		<div className="mt-7 flex-grow md:overflow-auto">
			<Table className="text-base max-md:hidden">
				<TableHeader>
					<TableRow className="bg-neutral-800/25">
						<TableHead className="py-4 font-bold">Item comida</TableHead>
						<TableHead className="py-4 font-bold">Calorias</TableHead>
						<TableHead className="py-4 font-bold">Proteinas g</TableHead>
						<TableHead className="py-4 font-bold">Carboidratos g</TableHead>
						<TableHead className="py-4 font-bold">Gorduras g</TableHead>
						<TableHead className="py-4 font-bold text-center">Editar</TableHead>
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
			<div className="space-y-4 md:hidden">
				{foodDay.length === 0 && (
					<div className="px-10">
						<p className="text-center font-semibold">
							Nenhuma comida salva no histórico hoje <br /> ╮(╯-╰)╭
						</p>
					</div>
				)}
				{foodDay.map((value, index) => {
					return (
						<table className="text-base flex px-10" key={index}>
							<tbody className="w-full max-sm:text-sm">
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Item comida
									</td>
									<td className="flex items-center border border-neutral-800 w-1/2 px-2">
										{value.name}
									</td>
								</tr>
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Calorias
									</td>
									<td className="flex items-center border border-neutral-800 w-1/2 px-2">
										{value.kcal} kcal
									</td>
								</tr>
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Proteinas g
									</td>
									<td className="flex items-center border border-neutral-800 w-1/2 px-2">
										{value.protein} g
									</td>
								</tr>
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Carboidratos g
									</td>
									<td className="flex items-center border border-neutral-800 w-1/2 px-2">
										{value.carb} g
									</td>
								</tr>
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Gorduras g
									</td>
									<td className="flex items-center border border-neutral-800 w-1/2 px-2">
										{value.fat} g
									</td>
								</tr>
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Excluir
									</td>
									<td className="flex border border-neutral-800 w-1/2">
										<EditDialog
											foodData={value}
											listFood={foodDay}
											updateListFoodFunc={updateListFoodFunc}
										/>
									</td>
								</tr>
								<tr className="flex">
									<td className="font-bold flex items-center w-1/2 bg-neutral-900 py-2 px-1">
										Editar
									</td>
									<td className="flex border border-neutral-800 w-1/2">
										<TrashDialog
											dataFood={value}
											listFood={foodDay}
											updateListFoodFunc={updateListFoodFunc}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					);
				})}
			</div>
		</div>
	);
}
