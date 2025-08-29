"use client";
import SignupForm from "@/components/auth-components/SignupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignupPage = () => {
	const router = useRouter();
	const { data: session } = useSession();

	// useEffect(() => {
	// 	if (session?.user && session?.user?.hasCompletedProfile) {
	// 		router.push("/dashboard");
	// 	}
	// }, [session]);

	return (
		<div className="flex justify-center items-center h-[90vh] p-4">
			<SignupForm />
		</div>
	);
};

export default SignupPage;
