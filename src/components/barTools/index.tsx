import { SettingsDialog } from "./settingsDialog";
import { AddFoodDialog } from "./addFoodDialog";
import { ShareDialog } from "./shareDialog";

interface Props {
	updateListFoodFunc: () => void;
}

export function BarTools({ updateListFoodFunc }: Props) {
	return (
		<div className="bg-neutral-700 text-black flex items-center gap-5 rounded-t-lg px-5 py-4 mt-3 fixed bottom-0">
			<SettingsDialog />
			<div className="-translate-y-2">
				<AddFoodDialog updateListFoodFunc={updateListFoodFunc} />
			</div>
			<ShareDialog />
		</div>
	);
}
