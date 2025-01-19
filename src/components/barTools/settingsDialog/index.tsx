import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { ChangeDataPersonal } from "./changeDataPersonal";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function SettingsDialog() {
	return (
		<Dialog>
			<TooltipProvider>
				<Tooltip delayDuration={450}>
					<TooltipTrigger>
						<DialogTrigger asChild>
							<div className="p-3 rounded-full bg-black/50 text-white cursor-pointer hover:bg-black/70">
								<Settings />
							</div>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>Configurações</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>Configurações</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div>
					<ChangeDataPersonal />
				</div>
			</DialogContent>
		</Dialog>
	);
}
