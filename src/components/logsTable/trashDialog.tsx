import { useMediaQuery } from "react-responsive";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FoodDayType } from "..";
import toast from "react-hot-toast";

interface Props {
	updateListFoodFunc: () => void;
	dataFood: FoodDayType;
	listFood: FoodDayType[];
}

export function TrashDialog({ dataFood, updateListFoodFunc, listFood }: Props) {
	const isMaxMd = useMediaQuery({ query: "(max-width: 768px)" });
	const handleDelete = () => {
		localStorage.setItem(
			"food_day",
			JSON.stringify(listFood!.filter((value) => value.id !== dataFood.id))
		);
		toast.success("Comida deletada");
		updateListFoodFunc();
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div className={isMaxMd ? "w-full flex justify-center" : ""}>
					{!isMaxMd && (
						<Button variant={"ghost"} className="cursor-pointer">
							<Trash className="size-5 text-red-500" />
						</Button>
					)}
					{isMaxMd && (
						<button className="cursor-pointer w-full flex items-center justify-center">
							<Trash className="size-4 text-red-500" />
						</button>
					)}
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent className="text-white">
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<Table>
					<TableHeader>
						<TableRow className="font-medium">
							<TableHead>Nome</TableHead>
							<TableHead>Kcal</TableHead>
							<TableHead>Carboidratos</TableHead>
							<TableHead>Proteinas</TableHead>
							<TableHead>Gorduras</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>{dataFood.name}</TableCell>
							<TableCell>{dataFood.kcal}</TableCell>
							<TableCell>{dataFood.carb}</TableCell>
							<TableCell>{dataFood.protein}</TableCell>
							<TableCell>{dataFood.fat}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<AlertDialogFooter>
					<AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
