import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function ChangeDataPersonal() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

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
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					className="bg-black/50 text-white cursor-pointer hover:bg-black/70"
					variant={"outline"}
					onClick={() => setIsOpen(true)}
				>
					Mudar dados
				</Button>
			</DialogTrigger>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>Você quer mudar seus dados?</DialogTitle>
					<DialogDescription className="indent-[2px]" asChild>
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
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex justify-end w-full">
					<Button onClick={changeData}>Mudar</Button>
					<Button variant={"destructive"} onClick={handleClose}>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
