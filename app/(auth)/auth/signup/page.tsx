"use client";
import AuthRedirectLoader from "@/components/auth-components/AuthRedirectLoader";
import SignupForm from "@/components/auth-components/SignupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const SignupPage = () => {
	const { status } = useSession();
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (status === "authenticated") {
			setIsAuthenticated(true);
			router.push("/dashboard");
		}
	});
	return (
		<div className="flex justify-center items-center h-[90vh] p-4">
			{isAuthenticated ? <AuthRedirectLoader /> : <SignupForm />}
		</div>
	);
};

export default SignupPage;
