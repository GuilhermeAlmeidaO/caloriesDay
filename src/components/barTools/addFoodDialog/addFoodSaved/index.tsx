import { FoodDayType } from "@/components";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Salad } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditFoodDialog } from "./editFoodDialog";
import { useMediaQuery } from "react-responsive";

interface Props {
	updateListFoodFunc: () => void;
	foodSaved: FoodDayType[];
	updateListFoodSavedFunc: () => void;
}

export function AddFoodSaved({
	updateListFoodFunc,
	updateListFoodSavedFunc,
	foodSaved,
}: Props) {
	const isMaxSm = useMediaQuery({ query: "(max-width: 640px)" });
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);

	const handleAddFood = (food: FoodDayType) => {
		const currentLs = JSON.parse(localStorage.getItem("food_day") || "[]");
		food.id = new Date().getTime();
		localStorage.setItem("food_day", JSON.stringify([...currentLs, food]));
		toast.success("Comida Adicionada");
		updateListFoodFunc();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					onClick={() => setIsOpen(true)}
					className="max-sm:w-full"
					variant={isMaxSm ? "outline" : "default"}
				>
					Comidas Salvas
				</Button>
			</DialogTrigger>
			<DialogContent className="text-white max-h-[90dvh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-center">Comidas Salvas</DialogTitle>
					<DialogDescription className="text-center">
						Aqui estão todas as comidas que você salvou
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col items-center gap-4 max-md:max-h-[60dvh] max-md:overflow-auto max-md:mt-2">
					{foodSaved.length > 0 ? (
						foodSaved.map((value, index) => (
							<div
								key={index}
								className={`flex gap-2 max-md:w-full ${
									index === 0 ? "" : "border-t border-neutral-800 pt-4"
								}`}
							>
								<div className="size-24 border border-neutral-800 rounded-sm flex items-center justify-center">
									<Salad className="text-neutral-500 size-2/5" />
								</div>
								<div className="flex flex-col gap-2 justify-center max-md:w-3/4">
									<h3 className="font-medium">{value.name}</h3>
									<div className="max-md:hidden">
										<Table>
											<TableHeader>
												<TableRow className="font-medium">
													<TableHead>Kcal</TableHead>
													<TableHead>Proteinas</TableHead>
													<TableHead>Gorduras</TableHead>
													<TableHead>Carboidratos</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow>
													<TableCell>{value.kcal}</TableCell>
													<TableCell>{value.protein}</TableCell>
													<TableCell>{value.fat}</TableCell>
													<TableCell>{value.carb}</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</div>
									<p className="md:hidden text-sm text-neutral-400">
										Calorias: {value.kcal} &#183; Proteinas: {value.protein} (g)
										&#183; Gorduras: {value.fat} (g) &#183; Carboidratos:{" "}
										{value.carb} (g)
									</p>
									<div className="w-full flex gap-2 items-center justify-end mt-2">
										<EditFoodDialog
											foodData={value}
											listFoodSaved={foodSaved}
											updateListFoodSavedFunc={updateListFoodSavedFunc}
										/>
										<Button onClick={() => handleAddFood(value)}>
											Adicionar
										</Button>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="my-10 text-neutral-400 text-center">
							Você não tem nenhuma comida salva <br /> (っ °Д °;)っ
						</p>
					)}
				</div>
				<DialogFooter className="justify-end w-full">
					<Button variant={"destructive"} onClick={handleClose}>
						Fechar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
