import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Agreement } from "@/models/agreement.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AgreementCard } from "@/components/dashboard-components/AgreementCard";
import PaginationUI from "@/components/dashboard-components/PaginationUI";
import EmptyAgreementsState from "@/components/dashboard-components/EmptyAgreementsState";

const PAGE_SIZE = 6;

export default async function AgreementsPage({
	searchParams,
}: {
	searchParams: { page?: string };
}) {
	await connectToDatabase();

	const session = await getServerSession(authOptions);
	if (!session || session === null) {
		redirect("/auth/signin");
	}

	const params = await searchParams;
	const currentPage = parseInt(params.page || "1", 10);

	const totalAgreements = await Agreement.countDocuments({
		user: session.user.id,
	});

	const agreements = JSON.parse(
		JSON.stringify(
			await Agreement.find({ user: session.user.id })
				.sort({ createdAt: -1 })
				.skip((currentPage - 1) * PAGE_SIZE)
				.limit(PAGE_SIZE)
		)
	);

	const totalPages = Math.ceil(totalAgreements / PAGE_SIZE);

	return (
		<div className="max-w-6xl mx-auto py-7 px-4">
			<h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
				<span className={`${totalAgreements === 0 ? "hidden" : ""}`}>Recent Agreements</span>
			</h1>

			{agreements.length === 0 ? (
				<EmptyAgreementsState />
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{agreements.map((agreement: any) => (
							<AgreementCard key={agreement._id} agreement={agreement} />
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<PaginationUI currentPage={currentPage} totalPages={totalPages} />
					)}
				</>
			)}
		</div>
	);
}
