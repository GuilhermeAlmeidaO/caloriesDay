export async function getSmallUrl(url: string): Promise<string | false> {
	try {
		const response = await fetch("https://api.encurtador.dev/encurtamentos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url }),
		});

		if (!response.ok) throw new Error();

		return response.text();
	} catch {
		return false;
	}
}
