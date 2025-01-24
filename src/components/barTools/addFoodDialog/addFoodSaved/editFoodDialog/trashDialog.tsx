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
	closePreviousDialog: () => void;
}

export function TrashDialog({
	updateListFoodSavedFunc,
	dataFoodSaved,
	listFoodSaved,
	closePreviousDialog,
}: Props) {
	const handleDelete = () => {
		localStorage.setItem(
			"food_saved",
			JSON.stringify(
				listFoodSaved!.filter((value) => value.id !== dataFoodSaved.id)
			)
		);
		toast.success("Comida deletada");
		updateListFoodSavedFunc();
		closePreviousDialog();
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={"outline"} className="max-md:w-1/2">
					Deletar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="text-white">
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="max-md:flex max-md:gap-2 max-md:flex-row">
					<AlertDialogAction
						onClick={handleDelete}
						className="max-md:w-1/2 max-md:mt-0"
					>
						Deletar
					</AlertDialogAction>
					<AlertDialogCancel className="max-md:w-1/2 max-md:mt-0">
						Cancelar
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
