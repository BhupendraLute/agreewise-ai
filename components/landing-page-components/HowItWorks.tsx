import { BrainCircuitIcon, CheckCircle2Icon, FileTextIcon, UploadIcon } from "lucide-react";

const HowItWorks = () => {
	return (
		<section
			id="how-it-works"
			className="py-20 px-6 md:px-12 lg:px-20 bg-muted/40 text-center"
		>
			<h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-2">
				<CheckCircle2Icon className="h-7 w-7 text-primary" />
				How It Works
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
				<div className="p-6 rounded-xl bg-background shadow">
					<UploadIcon className="h-8 w-8 text-primary mb-3" />
					<h3 className="font-semibold text-lg">Upload Agreement</h3>
					<p className="text-muted-foreground mt-2">
						Upload a PDF or paste the agreement text directly into
						the platform.
					</p>
				</div>
				<div className="p-6 rounded-xl bg-background shadow">
					<BrainCircuitIcon className="h-8 w-8 text-primary mb-3" />
					<h3 className="font-semibold text-lg">AI Analysis</h3>
					<p className="text-muted-foreground mt-2">
						Our AI breaks down the agreement into clauses,
						highlighting key details.
					</p>
				</div>
				<div className="p-6 rounded-xl bg-background shadow">
					<FileTextIcon className="h-8 w-8 text-primary mb-3" />
					<h3 className="font-semibold text-lg">Get Insights</h3>
					<p className="text-muted-foreground mt-2">
						See simplified summaries, rights, obligations, risks,
						and helpful tips.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
