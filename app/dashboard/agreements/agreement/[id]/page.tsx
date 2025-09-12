import { notFound, redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Agreement } from "@/models/agreement.model";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default async function AgreementPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;
	await connectToDatabase();

	// check session
	const session = await getServerSession(authOptions);
	if (!session || session === null) {
		redirect("/auth/signin");
	}

	// fetch agreement
	const agreement = await Agreement.findById(id);
	if (!agreement) {
		notFound();
	}

	// check ownership
	const user = await User.findById(agreement.user);
	if (!user || user._id.toString() !== session?.user.id) {
		notFound();
	}

	return (
		<div className="max-w-5xl mx-auto py-10 px-4">
			{/* Title and Summary */}
			<h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
				{agreement.title}
			</h1>
			<fieldset className="bg-card/70 field-sizing-content border border-border rounded-2xl p-4 mb-6">
				<legend className="py-2 px-4 bg-primary font-semibold rounded-lg">Agreement Summary</legend>
				<p className="text-muted-foreground mb-8">
					{agreement.summary}
				</p>
			</fieldset>

			{/* Clauses */}
			<h2 className="text-2xl font-semibold text-foreground mb-6">
				Clauses
			</h2>
			<Accordion type="single" collapsible className="space-y-6">
				{agreement.clauses.map((clause: any, index: number) => (
					<AccordionItem
						value={`Clause-${index + 1}`}
						key={clause.clause_number}
						className="bg-card/35 border border-border rounded-xl shadow-sm py-2 px-6 group"
					>
						<AccordionTrigger className="hover:no-underline cursor-pointer items-center">
							<div className="flex flex-col">
								<h3 className="font-semibold text-lg text-foreground mb-3">
									Clause-{clause.clause_number}
								</h3>
								<p className="text-sm text-muted-foreground group-hover:text-foreground group-active:text-foreground group-focus:text-foreground transition duration-100 mb-3">
									{clause.original_text}
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className="">
							<p className="mb-4 text-foreground">
                <span className="text-base text-primary">Simple Description:</span>
                <br />
								<span className="ml-2">{clause.simplified_text}</span>
							</p>

							{clause.obligations.length > 0 && (
								<div className="mb-4">
									<h4 className="font-medium text-primary mb-1">
										Obligations:
									</h4>
									<ul className="list-disc ml-5 space-y-1 text-sm text-foreground">
										{clause.obligations.map(
											(o: string, i: number) => (
												<li key={i}>{o}</li>
											)
										)}
									</ul>
								</div>
							)}

							{clause.rights.length > 0 && (
								<div className="mb-4">
									<h4 className="font-medium text-primary mb-1">
										Rights:
									</h4>
									<ul className="list-disc ml-5 space-y-1 text-sm text-foreground">
										{clause.rights.map(
											(r: string, i: number) => (
												<li key={i}>{r}</li>
											)
										)}
									</ul>
								</div>
							)}

							{clause.risks.length > 0 && (
								<div className="mb-4">
									<h4 className="font-medium text-primary mb-1">
										Risks:
									</h4>
									<ul className="list-disc ml-5 space-y-2 text-sm">
										{clause.risks.map(
											(
												risk: {
													risk_level: string;
													risk: string;
													solution: string;
												},
												i: number
											) => (
												<li
													key={i}
													className="text-foreground"
												>
													<span
														className={`font-bold ${
															risk.risk_level ===
															"high"
																? "text-red-500"
																: risk.risk_level ===
																  "mediun"
																? "text-yellow-500"
																: "text-green-500"
														} px-2 rounded`}
													>
														{risk.risk_level}:
													</span>{" "}
													{risk.risk}
													<br />
													<span className="text-foreground">
														<span className="font-semibold inline-block mt-2 ml-2 text-primary">
															Solution:
														</span>{" "}
														{risk.solution}
													</span>
												</li>
											)
										)}
									</ul>
								</div>
							)}

							<p className="text-base text-foreground bg-green-500/45 rounded-2xl py-4 px-6 leading-relaxed flex flex-1 gap-2">
								<span>
									<span className="w-fit text-foreground rounded p-1 font-bold leading-tight text-nowrap">
										Tip :
									</span>
								</span>{" "}
								<span className="w-full">{clause.tip}</span>
							</p>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			{/* Full Agreement Text */}
			<Accordion
				type="single"
				collapsible
				className="mt-10 mb-4 rounded-2xl border border-accent"
			>
				<AccordionItem value="agreement-text">
					<AccordionTrigger className="hover:no-underline py-2 px-6 cursor-pointer items-center">
						<h2 className="text-2xl font-semibold text-foreground">
							Full Agreement Text
						</h2>
					</AccordionTrigger>
					<AccordionContent className="mx-6 mt-2">
						<pre className="whitespace-pre-wrap p-5 rounded-xl bg-muted/30 text-foreground text-base">
							{agreement.agreement_text}
						</pre>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Metadata */}
			<p className="text-sm text-muted-foreground mt-8">
				Category: {agreement.category} | Created on:{" "}
				{new Date(agreement.createdAt).toLocaleDateString()}
			</p>
		</div>
	);
}
