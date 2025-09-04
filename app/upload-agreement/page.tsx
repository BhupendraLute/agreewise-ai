'use client';
import { useSession } from "next-auth/react";

const UploadAgreementPage = () => {
	const { data: session, status } = useSession();

	if (status === "unauthenticated") {
		return <div>Unauthorized</div>;
	}

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Upload Agreement</h1>
			<p>{session?.user?.email}</p>
		</div>
	);
};

export default UploadAgreementPage;
