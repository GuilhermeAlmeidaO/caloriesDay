export async function getSmallUrl(url: string): Promise<string | false> {
	try {
		const response = await fetch("https://api.tinyurl.com/create", {
			method: "POST",
			headers: {
				Authorization: `Bearer dKzScQBycmiqvaR6u0KtxuTN7VVYgSShPXAZGxv0ldvT8SjLu7V0910P2Xkh`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: url,
			}),
		});

		if (!response.ok) throw new Error();

		return response.json().then((value) => value.data.tiny_url);
	} catch {
		return false;
	}
}
