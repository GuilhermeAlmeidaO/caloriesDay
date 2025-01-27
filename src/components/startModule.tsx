import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Inputs {
	kg: number;
	cm: number;
	age: number;
}

export function StartModule() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [sex, setSex] = useState<string>();

	const submit = (values: Inputs) => {
		if (!sex) return;
		let tmb = 0;
		if (sex === "m") {
			tmb = 10 * values.kg + 6.25 * values.cm - 5 * values.age + 5;
		}
		if (sex === "f") {
			tmb = 10 * values.kg + 6.25 * values.cm - 5 * values.age - 161;
		}
		localStorage.setItem("personal_data", JSON.stringify({ ...values, tmb }));

		localStorage.setItem(
			"limit_nutrients",
			JSON.stringify({
				kcal: tmb,
				protein: Number((2.2 * values.kg).toFixed(2)),
				carb: Number((4.4 * values.kg).toFixed(2)),
				fat: Number((1 * values.kg).toFixed(2)),
			})
		);

		location.reload();
	};

	return (
		<div className="bg-neutral-950 min-h-[100dvh] text-white flex items-center justify-center">
			<form className="space-y-5" onSubmit={handleSubmit(submit)}>
				<div className="flex flex-col gap-5 items-center justify-center">
					<label htmlFor={"idInputKg"} className="flex flex-col gap-3 w-full">
						<p>Peso</p>
						<div className="flex">
							<Input
								id={"idInputKg"}
								className="rounded-l-md border-zinc-500 py-5 w-72"
								type="number"
								{...register("kg", { required: true, valueAsNumber: true })}
							/>
							<div className="font-semibold rounded-r-md border-[1px] border-zinc-500 px-2 py-1 flex items-center justify-center text-sm w-14">
								kg
							</div>
						</div>
					</label>
					<label htmlFor={"idInputCm"} className="flex flex-col gap-3 w-full">
						<p>Altura</p>
						<div className="flex">
							<Input
								id={"idInputCm"}
								type="number"
								className="rounded-l-md border-zinc-500 py-5 w-72"
								{...register("cm", { required: true, valueAsNumber: true })}
							/>
							<div className="font-semibold rounded-r-md border-[1px] border-zinc-500 px-2 py-1 flex items-center justify-center text-sm w-14">
								cm
							</div>
						</div>
					</label>
					<label htmlFor={"idInputAge"} className="flex flex-col gap-3 w-full">
						<p>Idade</p>
						<div className="flex">
							<Input
								id={"idInputAge"}
								type="number"
								className="rounded-l-md border-zinc-500 py-5 w-72"
								{...register("age", { required: true, valueAsNumber: true })}
							/>
							<div className="font-semibold rounded-r-md border-[1px] border-zinc-500 px-2 py-1 flex items-center justify-center text-sm w-14">
								anos
							</div>
						</div>
					</label>
				</div>
				<div className="flex">
					<label htmlFor={"idInputKg"} className="flex flex-col items-center">
						<div className="space-y-3">
							<p className="w-full">Sexo</p>
							<RadioGroup>
								<div
									className="flex items-center gap-1"
									onClick={() => setSex("m")}
								>
									<RadioGroupItem value="option-one-sex" id="option-one-sex" />
									<label
										htmlFor="option-one-sex"
										className="text-lg cursor-pointer"
									>
										Masculino
									</label>
								</div>
								<div
									className="flex items-center gap-1"
									onClick={() => setSex("f")}
								>
									<RadioGroupItem value="option-two-sex" id="option-two-sex" />
									<label
										htmlFor="option-two-sex"
										className="text-lg cursor-pointer"
									>
										Feminino
									</label>
								</div>
							</RadioGroup>
						</div>
					</label>
				</div>
				<div className="flex items-center justify-center w-1/2">
					<Button>Entrar</Button>
				</div>
			</form>
		</div>
	);
}
