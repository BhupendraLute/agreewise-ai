"use client";

import SigninForm from "@/components/auth-components/SigninForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SigninPage = () => {
	const router = useRouter();
	const { data: session } = useSession();

	// useEffect(() => {
	// 	if (session?.user && session?.user?.hasCompletedProfile) {
	// 		router.push("/dashboard");
	// 	}
	// }, [session]);

	return (
		<div className="flex justify-center items-center h-[90vh] p-4">
			<SigninForm />
		</div>
	);
};

export default SigninPage;
