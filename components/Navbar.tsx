"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
	const {  status } = useSession();
	const [loginStatus, setLoginStatus] = useState("unauthenticated");

	useEffect(() => {
		setLoginStatus(status);
	}, [status]);

	return (
		<nav className="flex items-center justify-between sticky top-0 w-full py-2 px-4 bg-background z-50">
			<Link
				href="/"
				className="inline-flex justify-center items-center p-1"
			>
				<Image
					className="size-8 md:size-10 "
					src="/favicon.webp"
					alt="logo"
					width={100}
					height={100}
				/>
				<span className="text-xl md:text-2xl text-foreground font-semibold">
					AgreeWise
				</span>
			</Link>
			<div className="flex items-center justify-center gap-2">
				{loginStatus === "unauthenticated" && (
					<Button variant={"ghost"} className="p-0 m-0">
						<Link
							href="/auth/signin"
							className="py-2 px-3 flex items-center justify-center"
						>
							<LogInIcon className="mr-2" />
							<span className="text-semibold text-foreground">
								Sign In
							</span>
						</Link>
					</Button>
				)}
				{loginStatus === "authenticated" && (
					<Button
						variant={"ghost"}
						className="py-2 px-3 flex items-center justify-center cursor-pointer"
						onClick={() => signOut()}
					>
						<LogOutIcon className="" />
						<span className="text-semibold text-foreground">
							Sign Out
						</span>
					</Button>
				)}
				{loginStatus === "loading" && (
					<div className="flex items-center py-2 m-0">
						<div className="h-5 w-5 rounded-md bg-gradient-to-r from-gray-200/10 via-gray-300/15 to-gray-200/10 animate-[shimmer_1.5s_infinite]" />
						<div className="h-5 w-20 rounded bg-gradient-to-r from-gray-200/10 via-gray-300/15 to-gray-200/10 animate-[shimmer_1.5s_infinite]" />
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
