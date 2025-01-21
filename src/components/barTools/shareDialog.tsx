import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode, Share2 } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { getSmallUrl } from "@/http/getSmallUrl";

export function ShareDialog() {
	const { Canvas } = useQRCode();

	const handleCopy = () => {
		toast.success("Link copiado");
	};

	const handleChange = () => {
		toast.success("Dados mudados");
	};

	useEffect(() => {
		const fn = async () => {
			const url = await getSmallUrl("https://google.com");
			console.log(url);
		};

		fn();
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="p-3 rounded-full bg-black/50 text-white cursor-pointer hover:bg-black/70">
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
						personalizados.
					</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue="share" className="w-full">
					<TabsList className="w-full">
						<TabsTrigger value="share" className="w-1/2">
							Compartilhe
						</TabsTrigger>
						<TabsTrigger value="change" className="w-1/2">
							Ler Compartilhamento
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="share"
						className="border border-neutral-700 p-2 rounded-md"
						asChild
					>
						<div className="flex flex-col items-center justify-center gap-5 py-10">
							<div className="bg-white w-max">
								<Canvas
									text={"https://github.com/bunlong/next-qrcode"}
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
							</div>
							<div className="flex gap-1 w-full px-3">
								<output className="w-full border border-neutral-700 px-2 py-1 rounded-sm text-neutral-100 cursor-pointer hover:bg-black/30">
									https://github.com/bunlong/next-qrcode
								</output>
								<Button onClick={handleCopy}>Copiar</Button>
							</div>
						</div>
					</TabsContent>
					<TabsContent
						value="change"
						className="border border-neutral-700 p-2 rounded-md"
						asChild
					>
						<div className="flex flex-col items-center justify-center gap-5 py-10">
							<div className="size-[200px] flex flex-col items-center justify-center text-neutral-400 hover:bg-neutral-900 transition-colors rounded-md shadow-sm shadow-neutral-800">
								<QrCode className="size-1/4" />
								<p className="text-xs text-center">
									Clique aqui para ler o Qr Code...
								</p>
							</div>
							<div className="flex gap-1 w-full px-3">
								<Input className="border border-neutral-700 px-2 py-1 rounded-sm text-neutral-100 cursor-pointer hover:bg-black/30" />
								<Button onClick={handleChange}>Pronto</Button>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
