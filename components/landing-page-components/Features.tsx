import { BrainCircuitIcon, FileTextIcon, LightbulbIcon, ShieldCheckIcon } from "lucide-react";

const Features = () => {
	return (
		<section
			id="features"
			className="py-20 px-6 md:px-12 lg:px-20 text-center"
		>
			<h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-2">
				<LightbulbIcon className="h-7 w-7 text-primary" />
				Why Choose AgreeWise?
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
					<FileTextIcon className="mx-auto h-10 w-10 text-primary mb-4" />
					<h3 className="font-semibold text-lg">Clear Summaries</h3>
					<p className="text-muted-foreground mt-2">
						Complex legal jargon simplified into plain,
						easy-to-understand language.
					</p>
				</div>
				<div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
					<ShieldCheckIcon className="mx-auto h-10 w-10 text-primary mb-4" />
					<h3 className="font-semibold text-lg">Know Your Rights</h3>
					<p className="text-muted-foreground mt-2">
						Understand your obligations, rights, and risks before
						signing anything.
					</p>
				</div>
				<div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
					<BrainCircuitIcon className="mx-auto h-10 w-10 text-primary mb-4" />
					<h3 className="font-semibold text-lg">Smart Guidance</h3>
					<p className="text-muted-foreground mt-2">
						Get actionable tips so you can make better decisions
						with confidence.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Features;
