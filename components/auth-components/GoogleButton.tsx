'use client';
import { FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
	return (
		<Button
			className="w-12 h-12 bg-blue-600 hover:bg-blue-700 py-2 px-2 font-bold cursor-pointer rounded-full"
			onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
		>
			<FaGoogle className="" />
		</Button>
	);
};

export default GoogleButton;
