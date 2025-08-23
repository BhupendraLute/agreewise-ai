import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { ThemeToggle } from "./components/ThemeToggle";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AgreeWise AI",
	description:
		"AgreeWise is an AI-powered platform that transforms complex legal documents into plain, simple language so you can understand what you’re signing — with confidence and clarity.",
	icons: {
		icon: "/favicon.webp",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<main className="bg-background mt-16 md:mt-20 relative">
						{children}

						<div className="fixed bottom-2 right-2">
							<ThemeToggle />
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
