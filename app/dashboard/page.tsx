import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UploadCloud, ShieldCheck, Lightbulb } from "lucide-react";

export default function DashboardPage() {
	return (
		<div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
			{/* Welcome Section */}
			<div>
				<h1 className="text-3xl font-bold text-foreground mb-2">
					Welcome back 👋
				</h1>
				<p className="text-muted-foreground">
					Manage your agreements, simplify clauses, and make confident
					decisions with AI-powered insights.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							<UploadCloud className="h-5 w-5 text-primary" />
							Upload Agreement
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Upload a new legal agreement and let AgreeWise break
							it down into simple insights.
						</p>
						<Button asChild>
							<Link href="/dashboard//upload-agreement">
								Upload
							</Link>
						</Button>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							<FileText className="h-5 w-5 text-primary" />
							View Agreements
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Browse all your past agreements, see simplified
							clauses, and manage them in one place.
						</p>
						<Button variant="outline" asChild>
							<Link href="/dashboard/agreements">View All</Link>
						</Button>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							<Lightbulb className="h-5 w-5 text-primary" />
							Tips & Guidance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Get AI-powered advice on obligations, rights, risks,
							and how to navigate agreements better.
						</p>
						<Button variant="outline" asChild>
							<Link href="/dashboard/tips">Explore Tips</Link>
						</Button>
					</CardContent>
				</Card>
			</div>

			<Card className="bg-muted/40">
				<CardContent className="flex flex-col sm:flex-row items-center gap-4 py-6">
					<ShieldCheck className="h-10 w-10 text-primary shrink-0" />
					<div>
						<h2 className="text-lg font-semibold text-foreground">
							Your data stays secure 🔒
						</h2>
						<p className="text-sm text-muted-foreground">
							Agreements you upload are private and accessible
							only to you. We never share your documents.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
