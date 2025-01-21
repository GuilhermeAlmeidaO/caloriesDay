import { FoodDayType } from "@/components";
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
import toast from "react-hot-toast";

interface Props {
	updateListFoodSavedFunc: () => void;
	dataFoodSaved: FoodDayType;
	listFoodSaved: FoodDayType[];
}

export function TrashDialog({
	updateListFoodSavedFunc,
	dataFoodSaved,
	listFoodSaved,
}: Props) {
	const handleDelete = () => {
		localStorage.setItem(
			"foods_saved",
			JSON.stringify(
				listFoodSaved!.filter((value) => value.id !== dataFoodSaved.id)
			)
		);
		toast.success("Comida deletada");
		updateListFoodSavedFunc();
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={"outline"}>Deletar</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="text-white">
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
