import { Button } from "@/components/ui/button";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function ChangeDataPersonal() {
	const changeData = () => {
		localStorage.removeItem("personal_data");
		location.reload();
	};

	interface DataPersonalType {
		age: string;
		cm: string;
		kg: string;
		tmb: number;
	}

	const dataPesonal: DataPersonalType = JSON.parse(
		localStorage.getItem("personal_data")!
	);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="bg-black/50 text-white cursor-pointer hover:bg-black/70"
					variant={"outline"}
				>
					Mudar dados
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="text-white">
				<AlertDialogHeader>
					<AlertDialogTitle>Você quer mudar seus dados?</AlertDialogTitle>
					<AlertDialogDescription className="indent-[2px]" asChild>
						<div className="flex flex-col gap-2">
							<p>
								Os registro de hoje não vão desaparecer, mas vão modificar com
								os novos dados
							</p>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Tamanho</TableHead>
										<TableHead>Peso</TableHead>
										<TableHead>Idade</TableHead>
										<TableHead>Tmb</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>{dataPesonal.cm} cm</TableCell>
										<TableCell>{dataPesonal.kg} kg</TableCell>
										<TableCell>{dataPesonal.age}</TableCell>
										<TableCell>{dataPesonal.tmb}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex justify-end w-full">
					<AlertDialogAction onClick={changeData}>Mudar</AlertDialogAction>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
