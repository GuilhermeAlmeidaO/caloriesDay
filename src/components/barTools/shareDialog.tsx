import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { getSmallUrl } from "@/http/getSmallUrl";

export function ShareDialog() {
	const { Canvas } = useQRCode();
	const [isOpen, setIsOpen] = useState(false);
	const [tinyUrl, setTinyUrl] = useState("Carregando...");
	const [requestFailed, setIsRequestFailed] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const fn = async () => {
			const objLs = {
				food_saved: localStorage.getItem("food_saved"),
				food_day: localStorage.getItem("food_day"),
				limit_nutrients: localStorage.getItem("limit_nutrients"),
				personal_data: localStorage.getItem("personal_data"),
			};

			const url = `https://caloriesday.vercel.app/shareDialog/?data=${encodeURIComponent(
				JSON.stringify(objLs)
			)}`;
			const tinyUrl = await getSmallUrl(url);
			if (tinyUrl === false) {
				setIsRequestFailed(true);
				return;
			}
			setTinyUrl(tinyUrl);
		};

		fn();
	}, [isOpen]);

	const handleCopy = () => {
		if (tinyUrl === "Carregando..." || requestFailed) return;
		navigator.clipboard
			.writeText(tinyUrl)
			.then(() => {
				toast.success("Link copiado");
			})
			.catch(() => {
				toast.error("O link não pode ser copiado");
			});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div
					className="p-3 rounded-full bg-black/50 text-white cursor-pointer hover:bg-black/70"
					onClick={() => setIsOpen(true)}
				>
					<Share2 />
				</div>
			</DialogTrigger>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle className="text-center">
						Compartilhe o seu histórico
					</DialogTitle>
					<DialogDescription className="text-center">
						Aqui você pode compartilhar seu histórico e seus dados
						personalizados para usar em outro dispositivo.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col items-center justify-center gap-5 py-10 border border-neutral-700 p-2 rounded-md">
					<div className="relative">
						{tinyUrl === "Carregando..." && (
							<div className="size-[200px] bg-black/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
						)}
						<div className="bg-white w-max">
							{requestFailed && (
								<div className="size-[200px] bg-neutral-200 flex items-center justify-center cursor-pointer">
									<p className="text-center text-neutral-900 font-medium text-lg">
										Algo deu errado <br /> ≡(▔﹏▔)≡
									</p>
								</div>
							)}

							{!requestFailed && (
								<Canvas
									text={tinyUrl}
									options={{
										errorCorrectionLevel: "M",
										margin: 1,
										scale: 4,
										width: 200,
										color: {
											dark: "#111111",
										},
									}}
								/>
							)}
						</div>
					</div>
					<div className="flex gap-1 w-full px-3">
						<output className="w-full border border-neutral-700 px-2 py-1 rounded-sm text-neutral-100 cursor-pointer hover:bg-black/30">
							{requestFailed && "Não conseguimos pegar seu link"}
							{!requestFailed && tinyUrl}
						</output>
						<Button onClick={handleCopy}>Copiar</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
