'use client'
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const GithubButton = () => {
	return (
		<Button
			className="w-12 h-12 bg-gray-700 hover:bg-gray-800 py-2 px-2 font-bold cursor-pointer rounded-full"
			onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
		>
			<FaGithub className="" />
		</Button>
	);
};

export default GithubButton;
