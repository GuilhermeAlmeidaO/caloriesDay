"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br" className="dark">
			<head>
				<title>CaloriesDay</title>
			</head>
			<body>
				<RecoilRoot>
					<Toaster position="bottom-right" />
					{children}
				</RecoilRoot>
			</body>
		</html>
	);
}
