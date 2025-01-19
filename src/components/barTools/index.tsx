import { Share2 } from "lucide-react";
import { SettingsDialog } from "./settingsDialog";
import { AddFoodDialog } from "./addFoodDialog";

interface Props {
	updateListFoodFunc: () => void;
}

export function BarTools({ updateListFoodFunc }: Props) {
	return (
		<div className="bg-neutral-700 text-black flex items-center gap-5 rounded-t-lg px-5 mt-3">
			<SettingsDialog />
			<div className="-translate-y-2">
				<AddFoodDialog updateListFoodFunc={updateListFoodFunc} />
			</div>
			<div className="p-3 rounded-full bg-black/50 text-white cursor-pointer hover:bg-black/70">
				<Share2 />
			</div>
		</div>
	);
}
