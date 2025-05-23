import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FoodDayType } from "../../../..";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TrashDialog } from "./trashDialog";

interface Props {
	foodData: FoodDayType;
	updateListFoodSavedFunc: () => void;
	listFoodSaved: FoodDayType[];
}

interface Inputs {
	name: string;
	kcal: number;
	protein: number;
	carb: number;
	fat: number;
}

export function EditFoodDialog({
	foodData,
	listFoodSaved,
	updateListFoodSavedFunc,
}: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const { register, handleSubmit, reset } = useForm<Inputs>({
		values: {
			carb: foodData.carb,
			fat: foodData.fat,
			name: foodData.name,
			kcal: foodData.kcal,
			protein: foodData.protein,
		},
	});

	useEffect(() => {
		if (!isOpen) reset();
	}, [isOpen, reset]);

	const handleClose = () => {
		setIsOpen(false);
	};

	const submit = (values: Inputs) => {
		Object.entries(values).map(([key, value]) => {
			if (isNaN(Number(value))) return;
			values[key as keyof Inputs] = Number(value) as never;
		});

		const id = foodData.id;
		const listFoodSavedWithoutFoodToUpdate = listFoodSaved.filter(
			(value) => value.id !== foodData.id
		);
		localStorage.setItem(
			"food_saved",
			JSON.stringify([{ ...values, id }, ...listFoodSavedWithoutFoodToUpdate])
		);

		updateListFoodSavedFunc();
		toast.success("Comida editada com sucesso");
		handleClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"}>Editar</Button>
			</DialogTrigger>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>Edite a comida</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<form className="grid grid-cols-2 grid-rows-3 gap-3 justify-center">
					<label
						htmlFor="nameInputId"
						className="cursor-pointer flex flex-col gap-3 col-span-2"
					>
						<p className="font-semibold text-sm">Nome da comida:</p>
						<Input
							id="nameInputId"
							placeholder="Arroz"
							className="rounded-sm"
							{...register("name", { required: true })}
							autoComplete="off"
							onFocus={(e) => e.target.select()}
						/>
					</label>
					<label
						htmlFor="kcalInputId"
						className="cursor-pointer flex flex-col gap-3"
					>
						<p className="font-semibold text-sm">Calorias:</p>
						<Input
							id="kcalInputId"
							className="rounded-sm"
							type="number"
							{...register("kcal", { required: true })}
							onFocus={(e) => e.target.select()}
						/>
					</label>
					<label
						htmlFor="carbInputId"
						className="cursor-pointer flex flex-col gap-3"
					>
						<p className="font-semibold text-sm">Carboidrato (g):</p>
						<Input
							id="carbInputId"
							className="rounded-sm"
							type="number"
							{...register("carb", { required: true })}
							onFocus={(e) => e.target.select()}
						/>
					</label>
					<label
						htmlFor="proteinInputId"
						className="cursor-pointer flex flex-col gap-3"
					>
						<p className="font-semibold text-sm">Proteína (g):</p>
						<Input
							id="proteinInputId"
							className="rounded-sm"
							type="number"
							{...register("protein", { required: true })}
							onFocus={(e) => e.target.select()}
						/>
					</label>
					<label
						htmlFor="fatInputId"
						className="cursor-pointer flex flex-col gap-3"
					>
						<p className="font-semibold text-sm">Gordura (g):</p>
						<Input
							id="fatInputId"
							className="rounded-sm"
							type="number"
							{...register("fat", { required: true })}
							onFocus={(e) => e.target.select()}
						/>
					</label>
					<DialogFooter className="w-full col-span-2 max-md:flex max-md:justify-end max-md:space-x-0">
						<div className="flex justify-between w-full max-md:hidden">
							<TrashDialog
								updateListFoodSavedFunc={updateListFoodSavedFunc}
								dataFoodSaved={foodData}
								listFoodSaved={listFoodSaved}
								closePreviousDialog={handleClose}
							/>
							<div className="space-x-3">
								<Button onClick={handleSubmit(submit)} type="button">
									Salvar Mudanças
								</Button>
								<Button
									variant={"destructive"}
									onClick={handleClose}
									type="button"
								>
									Sair
								</Button>
							</div>
						</div>
						<div className="md:hidden flex flex-col-reverse gap-2 w-full ml-0">
							<Button
								variant={"destructive"}
								onClick={handleClose}
								type="button"
							>
								Sair
							</Button>
							<div className="w-full flex gap-2">
								<Button
									onClick={handleSubmit(submit)}
									type="button"
									className="w-1/2"
								>
									Salvar Mudanças
								</Button>
								<TrashDialog
									updateListFoodSavedFunc={updateListFoodSavedFunc}
									dataFoodSaved={foodData}
									listFoodSaved={listFoodSaved}
									closePreviousDialog={handleClose}
								/>
							</div>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
