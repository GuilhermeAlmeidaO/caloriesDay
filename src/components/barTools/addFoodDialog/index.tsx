"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Inputs {
	name: string;
	kcal: number;
	protein: number;
	carb: number;
	fat: number;
}

interface Props {
	updateListFoodFunc: () => void;
}

export function AddFoodDialog({ updateListFoodFunc }: Props) {
	const { register, handleSubmit, reset } = useForm<Inputs>({
		values: { carb: 0, fat: 0, kcal: 0, protein: 0, name: "" },
	});

	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);

	useEffect(() => {
		if (!isOpen) reset();
	}, [isOpen, reset]);

	const submit = (values: Inputs, mode: "add" | "save") => {
		Object.entries(values).map(([key, value]) => {
			if (isNaN(Number(value))) return;
			values[key as keyof Inputs] = Number(value) as never;
		});

		const valuesWithId = { ...values, id: new Date().getTime() };
		if (mode === "add") {
			const ls = localStorage.getItem("food_day");
			if (!ls) {
				localStorage.setItem("food_day", JSON.stringify([{ ...valuesWithId }]));
			} else {
				localStorage.setItem(
					"food_day",
					JSON.stringify([...JSON.parse(ls), { ...valuesWithId }])
				);
			}
			toast.success("Comida adicionada");
			updateListFoodFunc();
		} else if (mode === "save") {
			const ls = localStorage.getItem("foods_saved");
			if (!ls) {
				localStorage.setItem(
					"foods_saved",
					JSON.stringify([{ ...valuesWithId }])
				);
			} else {
				console.log("saved");
				localStorage.setItem(
					"foods_saved",
					JSON.stringify([...JSON.parse(ls), { ...valuesWithId }])
				);
			}
			toast.success("Comida salva");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<TooltipProvider>
				<Tooltip delayDuration={450}>
					<TooltipTrigger>
						<DialogTrigger asChild>
							<div
								className="p-3 rounded-full bg-black/50 text-white cursor-pointer hover:bg-black/70"
								onClick={() => setIsOpen(true)}
							>
								<Plus />
							</div>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>Adicionar comida</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle className="text-center">Adicionar comida</DialogTitle>
					<DialogDescription className="text-center">
						Escreva os nutrientes que você comeu da sua refeição
					</DialogDescription>
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
					<DialogFooter className="flex items-end w-full col-span-2 justify-center">
						<Button
							variant={"outline"}
							type="button"
							onClick={handleSubmit((data) => submit(data, "save"))}
						>
							Salvar
						</Button>
						<Button
							variant={"outline"}
							type="button"
							onClick={handleSubmit((data) => submit(data, "add"))}
						>
							Adicionar
						</Button>
						<Button variant={"destructive"} type="button" onClick={handleClose}>
							Fechar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
