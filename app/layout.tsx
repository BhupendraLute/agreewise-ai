import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "../components/ThemeToggle";
import SessionWrapper from "@/components/SessionWrapper";

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
				<SessionWrapper>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}

						<div className="fixed bottom-2 right-2">
							<ThemeToggle />
						</div>
					</ThemeProvider>
				</SessionWrapper>
			</body>
		</html>
	);
}
